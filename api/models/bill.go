package models

import (
	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	PayerID     uint   `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Payer       Users  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	GroupID     uint   `gorm:"not null,constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Group       Group  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Type        string `gorm:"not null"`
	Description string
	Amount      float64 `gorm:"not null"`
}
