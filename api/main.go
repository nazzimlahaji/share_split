package main

import (
	"api/controllers"
	"api/initializers"
	"api/middleware"
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
		// Public routes

		// Protected routes
		api.Use(middleware.RequireAuth())
		{
			api.GET("/whoami", controllers.Whoami)

			api.POST("/user/create", controllers.CreateUser)
			api.GET("/user/list", controllers.UserList)
		}
	}

	port := os.Getenv("API_PORT")
	if port == "" {
		log.Default().Println("Port not set, defaulting to 8080")
		port = "8080"
	}
	r.Run(":" + port)
}
