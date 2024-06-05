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
	err := initializers.DB.AutoMigrate(&models.Users{})

	if err != nil {
		panic(err)
	} else {
		log.Default().Println("Migration complete!")
	}
}
