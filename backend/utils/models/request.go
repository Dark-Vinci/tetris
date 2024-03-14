package models

import "github.com/google/uuid"

type (
	CreateGameRequest struct {
		UserID uuid.UUID `json:"userID" validate:"required,uuid"`
		Score  uint      `json:"amount" validate:"required,gt=0"`
	}

	CreateUserRequest struct {
		Username string `json:"username" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
		IsAdmin  bool   `json:"isAdmin" validate:"required"`
	}

	LoginRequest struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}
)
