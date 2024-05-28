package models

import "gorm.io/gorm"

type Users struct {
	gorm.Model
	Email string `gorm:"unique"`
	Name  *string
}
