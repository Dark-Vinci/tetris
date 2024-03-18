package repository

import (
	"context"
	"fmt"

	"github.com/rs/zerolog"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

const (
	packageName = "backend.repository"
)

// Store object
type Store struct {
	logger *zerolog.Logger
	DB     *gorm.DB
}

// New creates new instance of a Store
func New(z zerolog.Logger, env models.Env) *Store {
	log := z.With().Str("PACKAGE", packageName).Logger()

	PORT := env.DBPort
	HOST := env.DBHOST

	db, err := gorm.Open(
		postgres.Open(fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
			HOST,
			PORT,
			env.DBUsername,
			env.DBName,
			env.DBPassword,
		)),
		&gorm.Config{},
	)
	if err != nil {
		z.Fatal().Err(err).Msg("could not connect to the DB")
		panic(err)
	}

	z.Debug().Msg("connected to the database")

	err = db.AutoMigrate(&models.User{}, &models.Note{})
	if err != nil {
		z.Fatal().Err(err).Msg("unable to auto migrate models")
		panic(err)
	}

	return &Store{
		logger: &log,
		DB:     db,
	}
}

func (s *Store) Close() {
	sqlDD, _ := s.DB.DB()
	_ = sqlDD.Close()
}

func (s *Store) getRequestID(ctx context.Context) string {
	rID := ctx.Value("RequestIDContextKey")
	if rID != nil {
		return rID.(string)
	}

	return helpers.ZeroUUID
}
