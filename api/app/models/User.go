package models

type Users struct {
	UID   string `gorm:"primaryKey"`
	Email string `gorm:"unique"`
	Name  *string
}
