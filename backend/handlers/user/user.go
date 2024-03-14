package user

import (
	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/utils/middlewares"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"net/http"
)

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
	}

	userGroup := r.Group("/user")

	userGroup.GET("/me", user.me())
	userGroup.POST("/login", user.signIn())
	userGroup.POST("/signup", user.signup())
	userGroup.GET("/all", user.getUsers())
}

func (u *userHandler) signup() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}

func (u *userHandler) signIn() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
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
