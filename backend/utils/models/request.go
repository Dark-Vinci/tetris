package models

import "github.com/google/uuid"

type (
	CreateNoteRequest struct {
		UserID  uuid.UUID `json:"userID" validate:"required,uuid"`
		Content string    `json:"content"`
		Title   string    `json:"title"`
	}

	UpdateNoteRequest struct {
		Content string    `json:"content" validate:"required"`
		Title   string    `json:"title" validate:"required"`
		ID      uuid.UUID `json:"id" validate:"required"`
	}

	CreateUserRequest struct {
		Username string `json:"username" validate:"required"`
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
		IsAdmin  bool   `json:"isAdmin"`
	}

	LoginRequest struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required"`
	}
)
