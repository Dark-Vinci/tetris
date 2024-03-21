package app

import (
	"time"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

func (a *App) CreateNote(ctx *gin.Context, notesRequest models.CreateNoteRequest) (*models.Note, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.notes.CreateNote").Logger()

	notes := models.Note{
		Content:   notesRequest.Content,
		UserID:    notesRequest.UserID,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Title:     notesRequest.Title,
	}

	createdNotes, err := a.notesRepository.Create(ctx, notes)
	if err != nil {
		log.Err(err).Msg("could not create notes")
		return nil, err
	}

	return createdNotes, nil
}

func (a *App) GetNotes(ctx *gin.Context, page helpers.Page) ([]*models.Note, helpers.PageInfo, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.notes.GetNotes").Logger()

	notes, pageInfo, err := a.notesRepository.GetAllNote(ctx, models.Note{}, page)
	if err != nil {
		log.Err(err).Msg("something went wrong")
		return nil, pageInfo, err
	}

	return notes, pageInfo, nil
}

func (a *App) GetNoteByID(ctx *gin.Context, id uuid.UUID) (*models.Note, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.notes.GetNoteByID").Logger()

	notes, err := a.notesRepository.GetByID(ctx, id)
	if err != nil {
		log.Err(err).Msg("note not found")
		return nil, err
	}

	return notes, nil
}

func (a *App) UpdateNote(ctx *gin.Context, note models.UpdateNoteRequest) (*models.Note, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.notes.UpdateNote").Logger()

	notes := models.Note{
		Content: note.Content,
		ID:      note.ID,
		Title:   note.Title,
	}

	updated, err := a.notesRepository.UpdateNote(ctx, notes)
	if err != nil {
		log.Err(err).Msg("note not found")
		return nil, err
	}

	return updated, nil
}

func (a *App) GetUserNotes(ctx *gin.Context, userID uuid.UUID, page helpers.Page, search string) ([]*models.Note, helpers.PageInfo, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.notes.GetUserNotes").Logger()

	notes, pInfo, err := a.notesRepository.GetAllNote(ctx, models.Note{UserID: userID, Title: search}, page)
	if err != nil {
		log.Err(err).Msg("something went wrong")
		return nil, pInfo, err
	}

	return notes, pInfo, nil
}
