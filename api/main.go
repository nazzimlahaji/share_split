package main

import (
	"api/controllers"
	"api/initializers"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.FirebaseConfig()
}
func main() {
	r := gin.Default()

	api := r.Group("/api")
	{
		api.POST("/user/create", controllers.CreateUser)
	}

	port := os.Getenv("API_PORT")
	if port == "" {
		log.Default().Println("Port not set, defaulting to 8080")
		port = "8080"
	}
	r.Run(":" + port)
}
