package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type GroupMember struct {
	gorm.Model
	GroupID uint      `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Group   Group     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserID  uuid.UUID `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	User    Users     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
