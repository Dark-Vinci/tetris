package app

import (
	"context"

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
}

// New creates a new instance of App
func New(e models.Env, s repository.Store, z zerolog.Logger) Operations {
	log := z.With().Str("APP_PACKAGE", "app").Logger()

	uRepo := repository.NewUser(&s)
	gRepo := repository.NewGame(&s)

	app := &App{
		env:            e,
		logger:         log,
		userRepository: *uRepo,
		gameRepository: *gRepo,
	}

	return Operations(app)
}
