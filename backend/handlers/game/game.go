package game

import (
	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"net/http"
)

type gameHandler struct {
	logger *zerolog.Logger
	app    *app.App
	env    *models.Env
}

func New(r *gin.RouterGroup, l *zerolog.Logger, a *app.App, e *models.Env) {
	game := gameHandler{
		logger: l,
		app:    a,
		env:    e,
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
