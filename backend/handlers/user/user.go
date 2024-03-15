package user

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/middlewares"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

const handlerNameUser = "handler.user"

type userHandler struct {
	logger     *zerolog.Logger
	app        *app.App
	env        *models.Env
	middleware middlewares.Middleware
}

func New(r *gin.RouterGroup, l *zerolog.Logger, a *app.App, e *models.Env, m middlewares.Middleware) {
	user := userHandler{
		app:        a,
		env:        e,
		middleware: m,
		logger:     l,
	}

	userGroup := r.Group("/user")

	userGroup.POST("/login", user.login())
	userGroup.POST("/signup", user.signup())
	userGroup.POST("/refresh-token", user.refreshToken())

	userGroup.GET("/me", m.AuthMiddleware(false), user.me())
	userGroup.GET("/all", m.AuthMiddleware(true), user.getUsers())
}

func (u *userHandler) refreshToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		var err error
		var _ string
		requestID := requestid.Get(c)

		bearerToken := c.Request.Header.Get("Authorization")
		if len(bearerToken) == 0 {
			u.logger.Err(err).Msg("refresh token is missing in headers")
			models.ErrorResponse(c, http.StatusUnauthorized, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: "refresh token is missing",
			})
			return
		}

		log.Info().Msg("payload received")
		if !strings.HasPrefix(bearerToken, "Bearer ") {
			log.Err(err).Msg("refresh token is invalid")
			models.ErrorResponse(c, http.StatusUnauthorized, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: "refresh token is invalid",
			})
			return
		}

		// validate token
		userUUID, err := u.middleware.ValidateRefreshToken(*u.logger, u.env, strings.TrimPrefix(bearerToken, "Bearer "))
		if err != nil {
			//errOccurred = true
			u.logger.Err(err).Msg("RefreshToken::unable to validate refresh token")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		// validate user
		user, err := u.app.GetUserByID(c, *userUUID)
		if err != nil {
			//errOccurred = true
			u.logger.Err(err).Msg("RefreshToken::unable to get user by ID")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			return
		}

		// create token
		tokenDetails, err := u.middleware.CreateToken(c, u.env, user.ID.String(), user.IsAdmin)
		if err != nil {
			u.logger.Err(err).Msg("unable to generate new tokens")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			return
		}

		response := models.RefreshTokenResponse{
			Request: models.Request{
				RequestID: requestID,
			},
			AccessToken:        tokenDetails.AccessToken,
			AccessTokenExpiry:  tokenDetails.AccessTokenExpiry,
			RefreshToken:       tokenDetails.RefreshToken,
			RefreshTokenExpiry: tokenDetails.RefreshTokenExpiry,
		}

		models.OkResponse(c, http.StatusOK, "token has been refreshed successfully!", response)
	}
}

func (u *userHandler) signup() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req models.CreateUserRequest
		var err error

		requestID := requestid.Get(c)

		if err = c.ShouldBind(&req); err != nil {
			u.logger.Err(err).Msg("bad request")

			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		err = helpers.ValidateRequest(req)
		if err != nil {
			log.Err(err).Msg("create user ValidateRequest failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			return
		}

		user, err := u.app.CreateUser(c, req)
		if err != nil {
			log.Err(err).Msg("create user error")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			return
		}

		user.Password = helpers.StarPassword

		token, err := u.middleware.CreateToken(c, u.env, user.ID.String(), user.IsAdmin)
		if err != nil {
			log.Err(err).Msg("token generation error")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
		}

		models.OkResponse(c, http.StatusCreated, "User account created successfully!", struct {
			User  models.User        `json:"user"`
			Token middlewares.Tokens `json:"token"`
		}{
			User:  *user,
			Token: *token,
		})
	}
}

func (u *userHandler) login() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req models.LoginRequest
		var err error

		requestID := requestid.Get(c)

		if err = c.ShouldBind(&req); err != nil {
			u.logger.Err(err).Msg("bad request")

			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		err = helpers.ValidateRequest(req)
		if err != nil {
			log.Err(err).Msg("create user ValidateRequest failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			return
		}

		user, err := u.app.Login(c, req)
		if err != nil {
			u.logger.Err(err).Msg("logging in error")

			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		user.Password = helpers.StarPassword

		token, err := u.middleware.CreateToken(c, u.env, user.ID.String(), user.IsAdmin)
		if err != nil {
			log.Err(err).Msg("token generation error")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
		}

		models.OkResponse(c, http.StatusCreated, "User logged in successfully!", struct {
			User  models.User        `json:"user"`
			Token middlewares.Tokens `json:"token"`
		}{
			User:  *user,
			Token: *token,
		})
	}
}

func (u *userHandler) me() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		var err error

		userID, ok := c.Get(middlewares.UserIDInContext)
		if !ok {
			err = errors.New("user not found")

			u.logger.Err(errors.New("user not found")).Msg("unable to get user")
			models.ErrorResponse(c, http.StatusUnprocessableEntity, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		uID, err := uuid.Parse(userID.(string))
		if err != nil {
			u.logger.Err(err).Msg("unable to get user")
			models.ErrorResponse(c, http.StatusUnprocessableEntity, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		user, err := u.app.GetUserByID(c, uID)
		if err != nil {
			u.logger.Err(err).Msg("unable to get user by id")
			models.ErrorResponse(c, http.StatusUnprocessableEntity, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		user.Password = helpers.StarPassword

		models.OkResponse(c, http.StatusCreated, "User account fetched successfully!", user)
	}
}

func (u *userHandler) getUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		pages := helpers.ParsePageParams(c)

		users, pageInfo, err := u.app.GetUsers(c, pages)
		if err != nil {
			u.logger.Err(err).Msg("unable to fetch list of users")
			models.ErrorResponse(c, http.StatusUnprocessableEntity, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameUser,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		models.OkResponse(c, http.StatusOK, "paginated user list fetched successfully!", helpers.PaginatedResponse{
			Items: users,
			Page:  pageInfo,
		})
	}
}
