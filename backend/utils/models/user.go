package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        uuid.UUID       `gorm:"column:id;PRIMARY_KEY;type:uuid;default:gen_random_uuid()" json:"ID"`
	Username  string          `json:"username" gorm:"unique"`
	Password  string          `json:"password"`
	IsAdmin   bool            `json:"isAdmin"`
	Email     string          `json:"email" gorm:"unique"`
	CreatedAt time.Time       `json:"createdAt"`
	DeletedAt *gorm.DeletedAt `json:"deletedAt,omitempty"`
}
