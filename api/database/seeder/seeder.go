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
	log.Default().Println("Seeding start. Please wait...")

	users := []models.Users{
		{Email: "nazzimlahaji@gmail.com", Name: "Nazzim"},
	}

	for _, user := range users {
		result := initializers.DB.Create(&user)
		if result.Error != nil {
			panic(result.Error)
		}
	}

	log.Default().Println("Seeding finish.")
}
