package app

import (
	"time"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

func (a *App) CreateGame(ctx *gin.Context, gameRequest models.CreateGameRequest) (*models.Game, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.game.CreateGame").Logger()

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

func (a *App) GetGames(ctx *gin.Context, page helpers.Page) ([]*models.Game, helpers.PageInfo, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.game.GetGames").Logger()

	games, pageInfo, err := a.gameRepository.GetAllGame(ctx, models.Game{}, page)
	if err != nil {
		log.Err(err).Msg("something went wrong")
		return nil, pageInfo, err
	}

	return games, pageInfo, nil
}

func (a *App) GetUserGames(ctx *gin.Context, userID uuid.UUID, page helpers.Page) ([]*models.Game, helpers.PageInfo, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.game.GetUserGames").Logger()

	games, pInfo, err := a.gameRepository.GetAllGame(ctx, models.Game{UserID: userID}, page)
	if err != nil {
		log.Err(err).Msg("something went wrong")
		return nil, pInfo, err
	}

	return games, pInfo, nil
}
