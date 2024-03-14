package app

import (
	"context"
	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"time"
)

func (a *App) CreateGame(ctx *gin.Context, gameRequest models.CreateGameRequest) (*models.Game, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "repository.game.GetByID").Logger()

	game := models.Game{
		Score:     gameRequest.Score,
		UserID:    gameRequest.UserID,
		CreatedAt: time.Now(),
	}

	games, err := a.gameRepository.Create(ctx, game)

	if err != nil {
		log.Err(err).Msg("could not create game")
		return nil, err
	}

	return games, nil
}

func (a *App) GetGames(ctx context.Context, page helpers.Page) ([]*models.Game, error) {
	games, _, err := a.gameRepository.GetAllGame(ctx, models.Game{}, page)

	if err != nil {
		a.logger.Err(err).Msg("something went wrong")
		return nil, err
	}

	return games, nil
}
