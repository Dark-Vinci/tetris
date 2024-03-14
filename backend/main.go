package main

import (
	"context"
	"errors"
	"github.com/dark-vinci/tetris/backend/app"
	"github.com/dark-vinci/tetris/backend/repository"
	"github.com/dark-vinci/tetris/backend/utils/models"

	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
)

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), "TETRIS_API", c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func main() {
	r := gin.New()

	r.GET("/", func(c *gin.Context) {
		//time.Sleep(5 * time.Second)
		c.String(http.StatusOK, "Welcome Gin Server")
	})

	logger := zerolog.New(os.Stderr).With().Timestamp().Logger()
	applicationLogger := logger.With().Str("TETRIS_API", "api").Logger()

	e := models.Env{
		DBPassword: "docker",
		DBName:     "tetris",
		DBUsername: "docker",
		DBHOST:     "localhost",
		DBPort:     "5420",
	}

	repo := repository.New(applicationLogger, e)

	_ = app.New(e, *repo, logger)

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowHeaders = []string{"*"}
	corsConfig.AllowAllOrigins = true

	r.Use(cors.New(corsConfig), gin.Recovery())
	r.Use(GinContextToContextMiddleware())
	r.Use(requestid.New())

	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown: ", err)
	}

	log.Println("Server exiting")
}
