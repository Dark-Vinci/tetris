package game

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/utils/middlewares"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

type gameHandler struct {
	logger     *zerolog.Logger
	app        *app.App
	env        *models.Env
	middleware middlewares.Middleware
}

func New(r *gin.RouterGroup, l *zerolog.Logger, a *app.App, e *models.Env, m middlewares.Middleware) {
	game := gameHandler{
		logger:     l,
		app:        a,
		env:        e,
		middleware: m,
	}

	gameGroup := r.Group("/game")

	gameGroup.POST("/", game.create())
	gameGroup.GET("/my-games", game.getUserGames())
	gameGroup.GET("/all", game.getAllGames())
}

func (u *gameHandler) create() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}

func (u *gameHandler) getUserGames() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}

func (u *gameHandler) getAllGames() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}
