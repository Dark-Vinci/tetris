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

type GameRepo interface {
	Create(ctx context.Context, u models.Game) (*models.Game, error)
	GetAllGame(ctx context.Context, query models.Game, p helpers.Page) ([]*models.Game, helpers.PageInfo, error)
	SoftDeleteByID(ctx context.Context, ID uuid.UUID) error
	GetByID(ctx context.Context, ID uuid.UUID) (*models.Game, error)
}

type Game struct {
	logger  zerolog.Logger
	storage *Store
}

// NewGame creates a new reference to the Game storage entity
func NewGame(s *Store) *GameRepo {
	l := s.logger.With().Str("LEVEL_NAME", "game").Logger()
	game := &Game{
		logger:  l,
		storage: s,
	}
	gameDatabase := GameRepo(game)
	return &gameDatabase
}

func (g *Game) GetByID(ctx context.Context, ID uuid.UUID) (*models.Game, error) {
	log := g.logger.With().Str(helpers.LogStrRequestIDLevel, g.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.game.GetByID").Logger()

	var game models.Game
	db := g.storage.DB.WithContext(ctx).Where("id = ?", ID.String()).Find(&game)
	if db.Error != nil || strings.EqualFold(game.ID.String(), helpers.ZeroUUID) {
		log.Err(db.Error).Msg("record not found")
		return nil, helpers.ErrRecordNotFound
	}
	return &game, nil
}

func (g *Game) GetAllGame(ctx context.Context, query models.Game, page helpers.Page) ([]*models.Game, helpers.PageInfo, error) {
	log := g.logger.With().Str(helpers.LogStrRequestIDLevel, g.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.game.GetAllGame").Logger()

	var games []*models.Game
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

	queryDraft := g.storage.DB.WithContext(ctx).Model(models.Game{}).Where(query)

	// then do counting
	var count int64
	queryDraft.Count(&count)

	db := queryDraft.Offset(offset).Limit(*page.Size).
		Order(fmt.Sprintf("%s %s", *page.SortBy, sortDirection)).
		Find(&games)

	if db.Error != nil {
		log.Err(db.Error).Msg("could not fetch list of games")
		return nil, helpers.PageInfo{}, helpers.ErrEmptyResult
	}

	return games, helpers.PageInfo{
		Page:            *page.Number,
		Size:            *page.Size,
		HasNextPage:     int64(offset+*page.Size) < count,
		HasPreviousPage: *page.Number > 1,
		TotalCount:      count,
	}, nil
}

func (g *Game) Create(ctx context.Context, game models.Game) (*models.Game, error) {
	log := g.logger.With().Str(helpers.LogStrRequestIDLevel, g.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.game.Create").Logger()

	db := g.storage.DB.WithContext(ctx).Model(&models.Game{}).Create(&game)
	if db.Error != nil {
		log.Err(db.Error).Msg("unable to insert new row")
		if strings.Contains(db.Error.Error(), "duplicate key value") {
			return nil, errors.New("duplicate record error")
		}
		return nil, helpers.ErrRecordCreationFailed
	}

	return &game, nil
}

func (g *Game) SoftDeleteByID(ctx context.Context, id uuid.UUID) error {
	log := g.logger.With().Str(helpers.LogStrRequestIDLevel, g.storage.getRequestID(ctx)).
		Str(helpers.LogStrKeyMethod, "repository.game.SoftDeleteByID").Logger()

	db := g.storage.DB.WithContext(ctx).Model(models.Game{}).Where("id = ?", id).UpdateColumns(models.Game{
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
