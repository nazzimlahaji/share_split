package models

import "api/helpers"

type Users struct {
	helpers.Model
	Email string `gorm:"unique"`
	Name  string
}
