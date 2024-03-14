package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"

	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/handlers"
	"github.com/dark-vinci/tetris/backend/repository"
	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/middlewares"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

func main() {
	r := gin.New()

	//configure cors to allow request from any link
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowHeaders = []string{"*"}
	corsConfig.AllowAllOrigins = true

	r.Use(cors.New(corsConfig), gin.Recovery())
	r.Use(helpers.GinContextToContextMiddleware())
	r.Use(requestid.New())

	logger := zerolog.New(os.Stderr).With().Timestamp().Logger()
	appLogger := logger.With().Str("TETRIS_API", "api").Logger()

	//create env
	e := models.NewEnv()

	//create repository
	repo := repository.New(appLogger, *e)

	//create app
	a := app.New(*e, *repo, logger)
	//create middleware
	m := middlewares.NewMiddleware(logger, e, a)

	//create handlers
	h := handlers.New(&logger, a, e, r, *m)
	//build project
	h.Build()

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			appLogger.Err(err).Msg("Listening error")
		}
	}()

	quit := make(chan os.Signal, 1)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	appLogger.Debug().Msg("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		appLogger.Err(err).Msg("Server forced to shutdown")
	}

	appLogger.Debug().Msg("Server exiting")
}
