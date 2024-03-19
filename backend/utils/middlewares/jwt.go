package middlewares

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	ginJwt "github.com/appleboy/gin-jwt/v2"
	jwtGo "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/utils/models"
)

type Tokens struct {
	AccessToken        string
	RefreshToken       string
	AccessTokenExpiry  string
	RefreshTokenExpiry string
}

var (
	identityKey     = "id"
	realm           = "t-e-t-r-i-s"
	claimsID        = "id"
	isAdminClaims   = "is_admin"
	claimsExpiry    = "exp"
	claimsCreatedAt = "orig_iat"

	// ErrUnexpectedSigningMethod occurs when a token does not conform to the expected signing method
	ErrUnexpectedSigningMethod = errors.New("unexpected signing method")

	// ErrInvalidToken indicates JWT token has expired. Can't refresh.
	ErrInvalidToken = errors.New("token is invalid/expired")

	// ErrMissingToken reports missing auth token
	ErrMissingToken = errors.New("auth token is missing from the header")

	// ErrUnauthorized reports unauthorized user
	ErrUnauthorized = errors.New("you are not authorized")

	// ErrInvalidTokenHeaderFormat e.g when client passes the token without the Bearer prefix
	ErrInvalidTokenHeaderFormat = errors.New("invalid token header format, token type must be bearer")
)

func jwtAccessTokenExpiry(env *models.Env) time.Duration {
	ttl, err := strconv.Atoi(env.JWTAccessTokenExpiry)
	if err != nil {
		return time.Minute * 10000
	}

	return time.Minute * time.Duration(ttl)
}

func jwtRefreshTokenExpiry(env *models.Env) time.Duration {
	ttl, err := strconv.Atoi(env.JWTRefreshTokenExpiry)
	if err != nil {
		return time.Hour * 240000
	}

	return time.Hour * time.Duration(ttl)
}

// CreateToken creates a new user access and refresh tokens
func (m *Middleware) CreateToken(c *gin.Context, env *models.Env, userID string, isAdmin bool) (*Tokens, error) {
	accessToken := jwtGo.New(jwtGo.GetSigningMethod(m.jwt.SigningAlgorithm))
	accessClaims := accessToken.Claims.(jwtGo.MapClaims)

	refreshToken := jwtGo.New(jwtGo.GetSigningMethod(m.jwt.SigningAlgorithm))
	refreshClaims := refreshToken.Claims.(jwtGo.MapClaims)

	accessExpire := time.Now().Add(jwtAccessTokenExpiry(env))
	refreshExpire := time.Now().Add(jwtRefreshTokenExpiry(env))

	accessClaims[claimsID] = userID
	accessClaims[claimsExpiry] = accessExpire.Unix()
	accessClaims[claimsCreatedAt] = m.jwt.TimeFunc().Unix()

	refreshClaims[claimsID] = userID
	refreshClaims[claimsExpiry] = refreshExpire.Unix()
	refreshClaims[claimsCreatedAt] = m.jwt.TimeFunc().Unix()

	accessClaims[isAdminClaims] = isAdmin
	refreshClaims[isAdminClaims] = isAdmin

	accessTokenString, err := m.signedString(accessToken)
	if err != nil {
		return nil, err
	}
	refreshTokenString, err := m.signedString(refreshToken)
	if err != nil {
		return nil, err
	}

	// save refresh token in cookie, for future check
	c.SetCookie(
		userID,
		refreshTokenString,
		int(time.Now().Add(jwtRefreshTokenExpiry(env)).Unix()-time.Now().Unix()),
		"/",
		m.jwt.CookieDomain,
		m.jwt.SecureCookie,
		m.jwt.CookieHTTPOnly,
	)

	return &Tokens{
		AccessToken:        accessTokenString,
		RefreshToken:       refreshTokenString,
		AccessTokenExpiry:  accessExpire.String(),
		RefreshTokenExpiry: refreshExpire.String(),
	}, err
}

// GetGinJWTMiddleware returns GinJWTMiddleware
func (m *Middleware) GetGinJWTMiddleware() *ginJwt.GinJWTMiddleware {
	return m.jwt
}

func (m *Middleware) signedString(token *jwtGo.Token) (string, error) {
	var tokenString string
	var err error
	if m.usingPublicKeyAlgo() {
		tokenString, err = token.SignedString(m.pKey)
	} else {
		tokenString, err = token.SignedString(m.jwt.Key)
	}
	return tokenString, err
}

func (m *Middleware) usingPublicKeyAlgo() bool {
	switch m.jwt.SigningAlgorithm {
	case "RS256", "RS512", "RS384":
		return true
	}
	return false
}

// ValidateRefreshToken validates the refresh token
func (m *Middleware) ValidateRefreshToken(z zerolog.Logger, env *models.Env, token string) (*uuid.UUID, error) {
	tokenGotten, err := jwtGo.Parse(token, func(token *jwtGo.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwtGo.SigningMethodHMAC); !ok {
			z.Error().Msgf("RefreshToken unexpected signing method: (%v)", token.Header["alg"])

			return nil, ErrUnexpectedSigningMethod
		}
		return []byte(env.JWTSigningSecret), nil
	})

	//any error may be due to token expiration
	if err != nil {
		z.Err(err).Msg("RefreshToken error")
		return nil, err
	}

	//is token valid?
	if err = tokenGotten.Claims.Valid(); err != nil {
		z.Err(err).Msg("RefreshToken failed :: invalid token")
		return nil, err
	}

	claims, ok := tokenGotten.Claims.(jwtGo.MapClaims)
	claimsUUID := claims[claimsID].(string)

	if ok && tokenGotten.Valid {
		//convert the interface to uuid.UUID
		parsedUUID, err := uuid.Parse(claimsUUID)
		if err != nil {
			z.Err(err).Msgf("RefreshToken error::(%v)", err)
			return nil, ErrInvalidToken
		}

		return &parsedUUID, nil
	}

	return nil, ErrInvalidToken
}

// ParseToken checks if token is valid and parses it
func (m *Middleware) ParseToken(env *models.Env, tokenStr string) (userID string, isAdmin bool, err error) {
	token, err := jwtGo.Parse(tokenStr, func(token *jwtGo.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwtGo.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(env.JWTSigningSecret), nil
	})

	if token == nil {
		m.logger.Error().Str("token", tokenStr).Msg("unable to parse token - token is most likely not valid")
		return userID, isAdmin, ErrInvalidToken
	}

	if claims, ok := token.Claims.(jwtGo.MapClaims); ok && token.Valid {
		userID = claims[claimsID].(string)

		if found, ok := claims[isAdminClaims]; ok {
			isAdmin = found.(bool)
		}

		return userID, isAdmin, nil
	}

	return userID, isAdmin, err
}
