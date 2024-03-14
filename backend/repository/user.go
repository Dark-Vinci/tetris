package repository

import (
	"context"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
)

type UserRepo interface {
	Create(ctx context.Context, u models.User) (*models.User, error)
	Delete(ctx context.Context, userID uuid.UUID) error
	GetUser(ctx context.Context, userID uuid.UUID) (*models.User, error)
}

type User struct {
	logger  zerolog.Logger
	storage *Store
}

// NewUser creates a new reference to the User storage entity
func NewUser(s *Store) *UserRepo {
	l := s.logger.With().Str("LEVEL_NAME", "user").Logger()
	user := &User{
		logger:  l,
		storage: s,
	}
	userDatabase := UserRepo(user)
	return &userDatabase
}

func (u *User) Delete(ctx context.Context, userID uuid.UUID) error {
	return nil
}

func (u *User) Create(ctx context.Context, user models.User) (*models.User, error) {
	return nil, nil
}

func (u *User) GetUser(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	return nil, nil
}
