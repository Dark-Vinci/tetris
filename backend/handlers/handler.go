package handlers

import (
	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/handlers/game"
	"github.com/dark-vinci/tetris/backend/handlers/user"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
)

type Handler struct {
	app *app.App
	//externalAPI *externalapiApp.ExternalAPI
	//webhook     *webhook.Webhook
	logger *zerolog.Logger
	env    *models.Env
	//metrics     *metrics.Metrics
	api *gin.RouterGroup
	//group *gin.RouterGroup
	//utils       *utilsApp.Utils
	//kyc         *kycApp.Kyc

	//middleware middleware.Middleware
}

func New(z *zerolog.Logger, a *app.App, env *models.Env, engine *gin.Engine) *Handler {
	log := z.With().Str("LogStrPackageLevel", "handler").Logger()
	apiGroup := engine.Group("/tetris")

	return &Handler{
		app:    a,
		logger: &log,
		env:    env,
		api:    apiGroup,
	}
}

func (h *Handler) Build() {
	h.api.GET("/ping", func(c *gin.Context) {
		c.JSON(200, struct {
			Healthy bool `json:"healthy"`
		}{
			Healthy: true,
		})
	})

	api := h.api.Group("/api")

	user.New(api, h.logger, h.app, h.env)
	game.New(api, h.logger, h.app, h.env)
}
