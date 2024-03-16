package game

import (
	"errors"
	"net/http"

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

	gameGroup.POST("", m.AuthMiddleware(false), game.create())
	gameGroup.GET("/user", m.AuthMiddleware(false), game.getUserGames())
	gameGroup.GET("/all", m.AuthMiddleware(true), game.getAllGames())
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
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()
		var err error

		pages := helpers.ParsePageParams(c)

		userID, ok := c.Get(middlewares.UserIDInContext)
		if !ok {
			err = errors.New("game not found")

			u.logger.Err(errors.New("game not found")).Msg("unable to get game")
			models.ErrorResponse(c, http.StatusUnprocessableEntity, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameAccount,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		uID, err := uuid.Parse(userID.(string))
		if err != nil {
			u.logger.Err(err).Msg("unable to parse userID")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameAccount,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		res, pageInfo, err := u.app.GetUserGames(c, uID, pages)

		models.OkResponse(c, http.StatusOK, "paginated user games fetched successfully!", helpers.PaginatedResponse{
			Items: res,
			Page:  pageInfo,
		})
	}
}

func (u *gameHandler) getAllGames() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()

		pages := helpers.ParsePageParams(c)

		res, pageInfo, err := u.app.GetGames(c, pages)
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

		models.OkResponse(c, http.StatusOK, "Paginated games fetched successfully", helpers.PaginatedResponse{
			Items: res,
			Page:  pageInfo,
		})
	}
}
