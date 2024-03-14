package repository

import (
	"context"
	"fmt"
	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/rs/zerolog"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
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
		log.Fatal().Err(err)
		panic(err)
	}
	z.Println("CONNECTED TO THE DB")

	err = db.AutoMigrate(&models.User{}, &models.Game{})
	if err != nil {
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
