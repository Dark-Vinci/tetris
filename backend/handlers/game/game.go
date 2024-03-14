package game

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

const handlerNameTransaction = "game"

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
		var req models.CreateGameRequest
		var err error

		requestID := requestid.Get(c)

		if err = c.ShouldBind(&req); err != nil {
			log.Err(err).Msg("bad request")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		err = helpers.ValidateRequest(req)
		if err != nil {
			log.Err(err).Msg("create game ValidateRequest failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			return
		}

		res, err := u.app.CreateGame(c, req)
		if err != nil {
			log.Err(err).Msg("create game failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			return
		}

		models.OkResponse(c, http.StatusCreated, "game created successfully!", res)
	}
}

func (u *gameHandler) getUserGames() gin.HandlerFunc {
	return func(c *gin.Context) {
		models.OkResponse(c, http.StatusCreated, "User account created successfully!", "hello")
	}
}

func (u *gameHandler) getAllGames() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()

		pages := helpers.ParsePageParams(c)

		res, err := u.app.GetGames(c, pages)
		if err != nil {
			u.logger.Err(err).Msg("something went wrong")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameAccount,
				PublicMessage: err.Error(),
			})

			c.Abort()
			return
		}
		models.OkResponse(c, http.StatusOK, "Paginated games fetched successfully", res)
	}
}
