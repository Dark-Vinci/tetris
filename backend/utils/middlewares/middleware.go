// Package middleware defines the middlewares and jwt related operations
package middlewares

import (
	"crypto/rsa"

	ginJwt "github.com/appleboy/gin-jwt/v2"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

const (

	// UserIDInContext context key holder
	UserIDInContext = "user_id_in_context"

	// IsAdminInContext context key holder
	IsAdminInContext = "is_admin_in_context"

	// IsAdminOnHeaders is_admin header key holder
	IsAdminOnHeaders = "is_admin"

	// packageName name of this package
	packageName = "middleware"
)

type Middleware struct {
	logger zerolog.Logger
	env    *models.Env
	jwt    *ginJwt.GinJWTMiddleware
	pKey   *rsa.PrivateKey
	app    *app.App
}

// NewMiddleware new instance of our custom ginJwt middleware
func NewMiddleware(z zerolog.Logger, env *models.Env, app *app.App) *Middleware {
	mWare, _ := jwtMiddleware(env)
	l := z.With().Str("LogStrKeyModule", packageName).Logger()
	return &Middleware{
		logger: l,
		env:    env,
		jwt:    mWare,
		app:    app,
	}
}

func jwtMiddleware(env *models.Env) (*ginJwt.GinJWTMiddleware, error) {
	return ginJwt.New(&ginJwt.GinJWTMiddleware{
		Realm:      realm,
		Key:        []byte(env.JWTSigningSecret),
		MaxRefresh: jwtRefreshTokenExpiry(env),
		PayloadFunc: func(data interface{}) ginJwt.MapClaims {
			if v, ok := data.(*models.User); ok {
				return ginJwt.MapClaims{
					identityKey: v.ID,
				}
			}
			return ginJwt.MapClaims{}
		},
		IdentityKey: identityKey,
		Timeout:     jwtAccessTokenExpiry(env),
	})
}
