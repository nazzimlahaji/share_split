package models

import (
	"api/helpers"

	"github.com/google/uuid"
)

type Bill struct {
	helpers.Model
	PayerID     uuid.UUID `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;type:uuid;"`
	Payer       Users     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	GroupID     uuid.UUID `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;type:uuid;"`
	Group       Group     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Type        string    `gorm:"not null"`
	Description string
	Amount      float64 `gorm:"not null"`
}
