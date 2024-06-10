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

	// Create roles
	roles := []models.Role{
		{Name: "Admin"},
		{Name: "User"},
	}

	for i, role := range roles {
		result := initializers.DB.Create(&role)
		if result.Error != nil {
			panic(result.Error)
		}
		// Update the role in the slice with the created role to get the ID
		roles[i] = role
	}

	// Create users
	users := []models.Users{
		{Email: "nazzimlahaji@gmail.com", Name: "Nazzim", RoleID: roles[0].ID},
	}

	for _, user := range users {
		result := initializers.DB.Create(&user)
		if result.Error != nil {
			panic(result.Error)
		}
	}

	log.Default().Println("Seeding finish.")
}
