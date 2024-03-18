package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Note struct {
	ID        uuid.UUID       `gorm:"column:id;PRIMARY_KEY;type:uuid;default:gen_random_uuid()" json:"id"`
	Content   string          `json:"content"`
	Title     string          `json:"title"`
	UserID    uuid.UUID       `json:"userID"`
	CreatedAt time.Time       `json:"createdAt"`
	UpdatedAt time.Time       `json:"updatedAt"`
	DeletedAt *gorm.DeletedAt `json:"deletedAt,omitempty"`
}
