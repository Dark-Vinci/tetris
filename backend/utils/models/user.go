package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        uuid.UUID       `gorm:"column:id;PRIMARY_KEY;type:uuid;default:gen_random_uuid()" json:"ID"`
	Username  string          `json:"username"`
	Password  string          `json:"password"`
	IsAdmin   bool            `json:"isAdmin"`
	Email     string          `json:"email"`
	CreatedAt time.Time       `json:"createdAt"`
	DeletedAt *gorm.DeletedAt `json:"deletedAt,omitempty"`
}
