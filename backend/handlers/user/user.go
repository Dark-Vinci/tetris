package user

import (
	"net/http"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
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

	userGroup.GET("/me", user.me())
	userGroup.POST("/login", user.login())
	userGroup.POST("/signup", user.signup())
	userGroup.GET("/all", user.getUsers())
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
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}

func (u *userHandler) getUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}
