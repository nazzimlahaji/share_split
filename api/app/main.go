package main

import (
	initializers "app/initializer"
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
	initializers.FirebaseConfig()
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})

	port := os.Getenv("API_PORT")
	if port == "" {
		fmt.Println("PORT environment variable is not set. Using default port 32012")
		port = "32012" // Default port if environment variable is not set
	}
	fmt.Println("Server is running on port " + port)
	http.ListenAndServe(":"+port, r)
}
