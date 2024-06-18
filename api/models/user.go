package models

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Email         string `gorm:"unique"`
	Name          string
	RoleID        uint       `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Role          Role       `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	DeactivatedAt *time.Time `gorm:"default:null"`
}
