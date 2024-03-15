package app

import (
	"errors"
	"time"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

func (a *App) GetUserByID(ctx *gin.Context, userID uuid.UUID) (*models.User, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.user.GetUserByID").Logger()

	user, err := a.userRepository.GetUserByID(ctx, userID)
	if err != nil {
		log.Err(err).Msg("unable to user by id")
		return nil, err
	}

	return user, nil
}

func (a *App) CreateUser(ctx *gin.Context, userRequest models.CreateUserRequest) (*models.User, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.user.CreateUser").Logger()

	//check if no user has the same email
	eUser, err := a.userRepository.GetUserByEmail(ctx, userRequest.Email)
	if err != nil && !errors.Is(err, helpers.ErrRecordNotFound) {
		log.Err(err).Msg("could not fetch user with the email")
		return nil, err
	}

	if eUser != nil {
		log.Err(err).Msg("could not fetch user with the email")
		return nil, helpers.ErrUserAlreadyExist
	}

	//check if no user has the same username
	eUser, err = a.userRepository.GetUserByUsername(ctx, userRequest.Username)
	if err != nil && !errors.Is(err, helpers.ErrRecordNotFound) {
		log.Err(err).Msg("could not fetch user with the email")
		return nil, err
	}

	if eUser != nil {
		log.Err(err).Msg("could not fetch user with the email")
		return nil, helpers.ErrUserAlreadyExist
	}

	uRequest := models.User{
		Username:  userRequest.Username,
		Password:  helpers.Password(userRequest.Password).Hash().String(),
		IsAdmin:   userRequest.IsAdmin,
		Email:     userRequest.Email,
		CreatedAt: time.Now(),
	}

	user, err := a.userRepository.CreateUser(ctx, uRequest)
	if err != nil {
		log.Err(err).Msg("unable to create user")
		return nil, err
	}

	return user, nil
}

func (a *App) Login(ctx *gin.Context, loginReq models.LoginRequest) (*models.User, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.user.Login").Logger()

	user, err := a.userRepository.GetUserByEmail(ctx, loginReq.Email)
	if err != nil {
		log.Err(err).Msg("invalid email")
		return nil, helpers.ErrRecordNotFound
	}

	//check if the password is valid
	valid := helpers.Password(user.Password).Check(helpers.Password(loginReq.Password))
	if !valid {
		log.Err(err).Msg("invalid password")
		return nil, helpers.ErrInvalidCredential
	}

	return user, nil
}

func (a *App) GetUsers(ctx *gin.Context, page helpers.Page) ([]*models.User, helpers.PageInfo, error) {
	requestID := requestid.Get(ctx)

	log := a.logger.With().Str(helpers.LogStrRequestIDLevel, requestID).
		Str(helpers.LogStrKeyMethod, "app.user.GetUsers").Logger()

	users, pageInfo, err := a.userRepository.GetAllUsers(ctx, models.User{}, page)
	if err != nil {
		log.Err(err).Msg("something went wrong")
		return nil, pageInfo, helpers.ErrRecordNotFound
	}

	// star the password of each
	for _, v := range users {
		v.Password = helpers.StarPassword
	}

	return users, pageInfo, nil
}
