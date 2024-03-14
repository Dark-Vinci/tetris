package handlers

import (
	"net/http"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/handlers/game"
	"github.com/dark-vinci/tetris/backend/handlers/user"
	"github.com/dark-vinci/tetris/backend/utils/middlewares"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

type Handler struct {
	app        *app.App
	logger     *zerolog.Logger
	env        *models.Env
	api        *gin.RouterGroup
	middleware middlewares.Middleware
}

func New(z *zerolog.Logger, a *app.App, env *models.Env, engine *gin.Engine, m middlewares.Middleware) *Handler {
	log := z.With().Str("LogStrPackageLevel", "handler").Logger()

	apiGroup := engine.Group("/tetris")

	return &Handler{
		app:        a,
		logger:     &log,
		env:        env,
		api:        apiGroup,
		middleware: m,
	}
}

func (h *Handler) Build() {
	h.api.GET("/ping", func(c *gin.Context) {
		requestID := requestid.Get(c)

		c.JSON(http.StatusOK, struct {
			Healthy   bool   `json:"healthy"`
			RequestID string `json:"requestID"`
		}{
			Healthy:   true,
			RequestID: requestID,
		})
	})

	api := h.api.Group("/api")

	user.New(api, h.logger, h.app, h.env, h.middleware)
	game.New(api, h.logger, h.app, h.env, h.middleware)
}
