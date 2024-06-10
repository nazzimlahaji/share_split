package models

import (
	"api/helpers"
	"time"

	"github.com/google/uuid"
)

type Users struct {
	helpers.Model
	Email         string `gorm:"unique"`
	Name          string
	RoleID        uuid.UUID  `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;type:uuid;"`
	Role          Role       `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	DeactivatedAt *time.Time `gorm:"default:null"`
}
