package app

import (
	"context"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/google/uuid"
)

func (a *App) GetUser(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	return nil, nil
}
