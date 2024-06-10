package models

import "api/helpers"

type Group struct {
	helpers.Model
	Name string `gorm:"unique"`
	Type string
}
