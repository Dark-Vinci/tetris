package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Game struct {
	ID        uuid.UUID       `gorm:"column:id;PRIMARY_KEY;type:uuid;default:gen_random_uuid()" json:"ID"`
	Score     uint            `json:"score"`
	UserID    uuid.UUID       `json:"userID"`
	CreatedAt time.Time       `json:"createdAt"`
	DeletedAt *gorm.DeletedAt `json:"deletedAt,omitempty"`
}
