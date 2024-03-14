package repository

import (
	"context"
	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type GameRepo interface {
	Create(ctx context.Context, u models.Game) (*models.Game, error)
	Delete(ctx context.Context, userID uuid.UUID) error
	GetGame(ctx context.Context, userID uuid.UUID) (*models.Game, error)
	GetUserGame(ctx context.Context, userID uuid.UUID, p helpers.Page) ([]models.Game, helpers.PageInfo, error)
	GetAllGame(ctx context.Context, p helpers.Page) ([]models.Game, helpers.PageInfo, error)
}

type Game struct {
	logger  zerolog.Logger
	storage *Store
}

// NewGame creates a new reference to the Game storage entity
func NewGame(s *Store) *GameRepo {
	l := s.logger.With().Str("LEVEL_NAME", "user").Logger()
	user := &Game{
		logger:  l,
		storage: s,
	}
	userDatabase := GameRepo(user)
	return &userDatabase
}

func (u *Game) Delete(ctx context.Context, userID uuid.UUID) error {
	return nil
}

func (u *Game) GetAllGame(ctx context.Context, p helpers.Page) ([]models.Game, helpers.PageInfo, error) {
	//return nil, nil
	return []models.Game{}, helpers.PageInfo{}, nil
}

func (u *Game) GetUserGame(ctx context.Context, userID uuid.UUID, p helpers.Page) ([]models.Game, helpers.PageInfo, error) {
	return []models.Game{}, helpers.PageInfo{}, nil
}

func (u *Game) Create(ctx context.Context, user models.Game) (*models.Game, error) {
	return nil, nil
}

func (u *Game) GetGame(ctx context.Context, userID uuid.UUID) (*models.Game, error) {
	return nil, nil
}
