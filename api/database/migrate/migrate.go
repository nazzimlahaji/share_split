package main

import (
	"api/initializers"
	"api/models"
	"log"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
}

func main() {
	log.Default().Println("Migration start. Please wait...")

	errRole := initializers.DB.AutoMigrate(&models.Role{})
	if errRole != nil {
		panic(errRole)
	}

	errUser := initializers.DB.AutoMigrate(&models.Users{})
	if errUser != nil {
		panic(errUser)
	}

	errGroup := initializers.DB.AutoMigrate(&models.Group{})
	if errGroup != nil {
		panic(errGroup)
	}

	errGroupMember := initializers.DB.AutoMigrate(&models.GroupMember{})
	if errGroupMember != nil {
		panic(errGroupMember)
	}

	errBill := initializers.DB.AutoMigrate(&models.Bill{})
	if errBill != nil {
		panic(errBill)
	}

	log.Default().Println("Migration complete!")
}
