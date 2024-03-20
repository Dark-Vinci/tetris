package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"gorm.io/gorm"

	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

type NoteRepo interface {
	Create(ctx context.Context, u models.Note) (*models.Note, error)
	GetAllNote(ctx context.Context, query models.Note, p helpers.Page) ([]*models.Note, helpers.PageInfo, error)
	SoftDeleteByID(ctx context.Context, ID uuid.UUID) error
	GetByID(ctx context.Context, ID uuid.UUID) (*models.Note, error)
	UpdateNote(ctx context.Context, note models.Note) (*models.Note, error)
	CountNotes(ctx context.Context) (int64, error)
}

type Note struct {
	logger  zerolog.Logger
	storage *Store
}

// NewNote creates a new reference to the Note storage entity
func NewNote(s *Store) *NoteRepo {
	l := s.logger.With().Str("LEVEL_NAME", "note").Logger()
	note := &Note{
		logger:  l,
		storage: s,
	}
	noteDatabase := NoteRepo(note)
	return &noteDatabase
}

func (n *Note) CountNotes(ctx context.Context) (int64, error) {
	log := n.logger.With().Str(helpers.LogStrRequestIDLevel, n.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.note.CountNotes").Logger()

	var count int64
	db := n.storage.DB.WithContext(ctx).Model(&models.Note{}).Count(&count)
	if db.Error != nil {
		log.Err(db.Error).Msg("count not possible")
		return count, helpers.ErrRecordNotFound
	}
	return count, nil
}

func (n *Note) UpdateNote(ctx context.Context, note models.Note) (*models.Note, error) {
	log := n.logger.With().Str(helpers.LogStrRequestIDLevel, n.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.note.UpdateNote").Logger()

	db := n.storage.DB.WithContext(ctx).Model(models.Note{
		ID: note.ID,
	}).UpdateColumns(models.Note{
		Title:     note.Title,
		Content:   note.Content,
		UpdatedAt: note.UpdatedAt,
	})
	if db.Error != nil {
		log.Err(db.Error).Msg("unable to update note")
		return nil, helpers.ErrRecordUpdateFail
	}
	return &note, nil
}

func (n *Note) GetByID(ctx context.Context, ID uuid.UUID) (*models.Note, error) {
	log := n.logger.With().Str(helpers.LogStrRequestIDLevel, n.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.note.GetByID").Logger()

	var note models.Note
	db := n.storage.DB.WithContext(ctx).Where("id = ?", ID.String()).Find(&note)
	if db.Error != nil || strings.EqualFold(note.ID.String(), helpers.ZeroUUID) {
		log.Err(db.Error).Msg("record not found")
		return nil, helpers.ErrRecordNotFound
	}
	return &note, nil
}

func (n *Note) GetAllNote(ctx context.Context, query models.Note, page helpers.Page) ([]*models.Note, helpers.PageInfo, error) {
	log := n.logger.With().Str(helpers.LogStrRequestIDLevel, n.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.note.GetAllNote").Logger()

	var notes []*models.Note
	offset := 0
	// load defaults
	if page.Number == nil {
		tmpPageNumber := helpers.PageDefaultNumber
		page.Number = &tmpPageNumber
	}
	if page.Size == nil {
		tmpPageSize := helpers.PageDefaultSize
		page.Size = &tmpPageSize
	}
	if page.SortBy == nil {
		tmpPageSortBy := helpers.PageDefaultSortBy
		page.SortBy = &tmpPageSortBy
	}
	if page.SortDirectionDesc == nil {
		tmpPageSortDirectionDesc := helpers.PageDefaultSortDirectionDesc
		page.SortDirectionDesc = &tmpPageSortDirectionDesc
	}

	if *page.Number > 1 {
		offset = *page.Size * (*page.Number - 1)
	}
	sortDirection := helpers.PageSortDirectionDescending
	if !*page.SortDirectionDesc {
		sortDirection = helpers.PageSortDirectionAscending
	}

	queryDraft := n.storage.DB.WithContext(ctx).Model(models.Note{}).Where(query)

	// then do counting
	var count int64
	queryDraft.Count(&count)

	db := queryDraft.Offset(offset).Limit(*page.Size).
		Order(fmt.Sprintf("%s %s", *page.SortBy, sortDirection)).
		Find(&notes)

	if db.Error != nil {
		log.Err(db.Error).Msg("could not fetch list of notes")
		return nil, helpers.PageInfo{}, helpers.ErrEmptyResult
	}

	return notes, helpers.PageInfo{
		Page:            *page.Number,
		Size:            *page.Size,
		HasNextPage:     int64(offset+*page.Size) < count,
		HasPreviousPage: *page.Number > 1,
		TotalCount:      count,
	}, nil
}

func (n *Note) Create(ctx context.Context, note models.Note) (*models.Note, error) {
	log := n.logger.With().Str(helpers.LogStrRequestIDLevel, n.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.note.Create").Logger()

	db := n.storage.DB.WithContext(ctx).Model(&models.Note{}).Create(&note)
	if db.Error != nil {
		log.Err(db.Error).Msg("unable to insert new row")
		if strings.Contains(db.Error.Error(), "duplicate key value") {
			return nil, errors.New("duplicate record error")
		}
		return nil, helpers.ErrRecordCreationFailed
	}

	return &note, nil
}

func (n *Note) SoftDeleteByID(ctx context.Context, id uuid.UUID) error {
	log := n.logger.With().Str(helpers.LogStrRequestIDLevel, n.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.note.SoftDeleteByID").Logger()

	db := n.storage.DB.WithContext(ctx).Model(models.Note{}).Where("id = ?", id).UpdateColumns(models.Note{
		DeletedAt: &gorm.DeletedAt{
			Time:  time.Now(),
			Valid: true,
		},
	})

	if db.Error != nil {
		log.Err(db.Error).Msg("soft delete failed")
		return helpers.ErrDeleteFailed
	}

	return nil
}
