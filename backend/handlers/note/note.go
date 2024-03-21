package note

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

const handlerNameTransaction = "note"

type noteHandler struct {
	logger     *zerolog.Logger
	app        *app.App
	env        *models.Env
	middleware middlewares.Middleware
}

func New(r *gin.RouterGroup, l *zerolog.Logger, a *app.App, e *models.Env, m middlewares.Middleware) {
	note := noteHandler{
		logger:     l,
		app:        a,
		env:        e,
		middleware: m,
	}

	noteGroup := r.Group("/note")

	noteGroup.POST("", m.AuthMiddleware(false), note.create())
	noteGroup.PUT("/update", note.update())
	noteGroup.GET("/mine", m.AuthMiddleware(false), note.getMyNotes())
	noteGroup.GET("/:id/user", m.AuthMiddleware(true), note.getUserNotes())
	noteGroup.GET("/:id", m.AuthMiddleware(false), note.getNoteByID())
	noteGroup.GET("/all", m.AuthMiddleware(true), note.getAllNotes())
}

func (u *noteHandler) getUserNotes() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()
		var err error

		userID := c.Param("id")

		uID, err := uuid.Parse(userID)
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

		pages := helpers.ParsePageParams(c)

		res, pageInfo, err := u.app.GetUserNotes(c, uID, pages, "")

		models.OkResponse(c, http.StatusOK, "paginated user notes fetched successfully!", helpers.PaginatedResponse{
			Items: res,
			Page:  pageInfo,
		})
	}
}

func (u *noteHandler) update() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req models.UpdateNoteRequest
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
			log.Err(err).Msg("update note ValidateRequest failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			return
		}

		res, err := u.app.UpdateNote(c, req)
		if err != nil {
			log.Err(err).Msg("update note failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			return
		}

		models.OkResponse(c, http.StatusCreated, "note created successfully!", res)
	}
}

func (u *noteHandler) getNoteByID() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()
		var err error

		id := c.Param("id")
		noteID, err := uuid.Parse(id)
		if err != nil {
			u.logger.Err(err).Msg("unable to parse note id")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameAccount,
				PublicMessage: err.Error(),
			})
			c.Abort()
			return
		}

		res, err := u.app.GetNoteByID(c, noteID)
		if err != nil {
			u.logger.Err(err).Msg("unable to get note by id")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameAccount,
				PublicMessage: err.Error(),
			})
		}

		models.OkResponse(c, http.StatusOK, "paginated user notes fetched successfully!", res)
	}
}

func (u *noteHandler) create() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req models.CreateNoteRequest
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
			log.Err(err).Msg("create note ValidateRequest failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			return
		}

		res, err := u.app.CreateNote(c, req)
		if err != nil {
			log.Err(err).Msg("create note failed")
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:            requestID,
				Handler:       handlerNameTransaction,
				PublicMessage: err.Error(),
			})
			return
		}

		models.OkResponse(c, http.StatusCreated, "note created successfully!", res)
	}
}

func (u *noteHandler) getMyNotes() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()
		var err error

		var search = c.Query("search")

		pages := helpers.ParsePageParams(c)

		userID, ok := c.Get(middlewares.UserIDInContext)
		if !ok {
			err = errors.New("note not found")

			u.logger.Err(errors.New("note not found")).Msg("unable to get note")
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

		res, pageInfo, err := u.app.GetUserNotes(c, uID, pages, search)

		models.OkResponse(c, http.StatusOK, "paginated user notes fetched successfully!", helpers.PaginatedResponse{
			Items: res,
			Page:  pageInfo,
		})
	}
}

func (u *noteHandler) getAllNotes() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		handlerNameAccount := c.FullPath()

		pages := helpers.ParsePageParams(c)

		res, pageInfo, err := u.app.GetNotes(c, pages)
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

		models.OkResponse(c, http.StatusOK, "Paginated notes fetched successfully", helpers.PaginatedResponse{
			Items: res,
			Page:  pageInfo,
		})
	}
}
