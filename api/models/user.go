package models

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	// gen_random_uuid() is a Postgres function
	// link: https://www.postgresql.org/docs/current/functions-uuid.html
	Uuid          string `gorm:"type:uuid;default:gen_random_uuid()"`
	Email         string `gorm:"unique"`
	Name          string
	RoleID        uint       `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Role          Role       `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	DeactivatedAt *time.Time `gorm:"default:null"`
}
