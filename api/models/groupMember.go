package models

import (
	"api/helpers"

	"github.com/google/uuid"
)

type GroupMember struct {
	helpers.Model
	GroupID uuid.UUID `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;type:uuid;"`
	Group   Group     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserID  uuid.UUID `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;type:uuid;"`
	User    Users     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
