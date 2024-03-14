package app

import (
	"context"
	"github.com/dark-vinci/tetris/backend/utils/helpers"

	"github.com/google/uuid"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/repository"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

type App struct {
	env            models.Env
	logger         zerolog.Logger
	userRepository repository.UserRepo
	gameRepository repository.GameRepo
}

type Operations interface {
	SignUp(ctx context.Context, user models.User) (*models.User, error)
	GetUser(ctx context.Context, userID uuid.UUID) (*models.User, error)
	CreateGame(ctx context.Context, user models.Game) (*models.Game, error)
	GetGames(ctx context.Context, page helpers.Page) ([]*models.Game, helpers.PageInfo, error)
	GetUserGames(ctx context.Context, user uuid.UUID, page helpers.Page) ([]*models.Game, helpers.PageInfo, error)
}

// New creates a new instance of App
func New(e models.Env, s repository.Store, z zerolog.Logger) *App {
	log := z.With().Str("APP_PACKAGE", "app").Logger()

	uRepo := repository.NewUser(&s)
	gRepo := repository.NewGame(&s)

	return &App{
		env:            e,
		logger:         log,
		userRepository: *uRepo,
		gameRepository: *gRepo,
	}
}
