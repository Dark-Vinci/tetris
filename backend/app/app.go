package app

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/repository"
	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

type App struct {
	env             models.Env
	logger          zerolog.Logger
	userRepository  repository.UserRepo
	notesRepository repository.NoteRepo
}

type Operations interface {
	GetUserByID(ctx *gin.Context, userID uuid.UUID) (*models.User, error)
	CreateUser(ctx *gin.Context, userRequest models.CreateUserRequest) (*models.User, error)
	Login(ctx *gin.Context, loginReq models.LoginRequest) (*models.User, error)
	CreateNotes(ctx context.Context, game models.Note) (*models.Note, error)
	GetNotes(ctx context.Context, page helpers.Page) ([]*models.Note, helpers.PageInfo, error)
	GetUserNotes(ctx context.Context, user uuid.UUID, page helpers.Page) ([]*models.Note, helpers.PageInfo, error)
}

// New creates a new instance of App
func New(e models.Env, s repository.Store, z zerolog.Logger) *App {
	log := z.With().Str("APP_PACKAGE", "app").Logger()

	uRepo := repository.NewUser(&s)
	gRepo := repository.NewNote(&s)

	return &App{
		env:             e,
		logger:          log,
		userRepository:  *uRepo,
		notesRepository: *gRepo,
	}
}
