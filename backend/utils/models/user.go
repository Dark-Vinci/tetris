package models

import "github.com/google/uuid"

type User struct {
	ID       uuid.UUID `gorm:"column:id;PRIMARY_KEY;type:uuid;default:gen_random_uuid()" json:"ID"`
	Username string    `json:"username"`
	Password string    `json:"password"`
	IsAdmin  bool      `json:"isAdmin"`
	Email    string    `json:"email"`
}

type SingIn struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}
