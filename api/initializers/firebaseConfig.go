package initializers

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

var AuthClient *auth.Client

// var AuthService *auth.

func FirebaseConfig() {
	// Initialize Firebase Admin SDK
	opt := option.WithCredentialsFile("./firebase.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v", err)
	}

	// Create Firebase Auth client
	AuthClient, err = app.Auth(context.Background())
	if err != nil {
		log.Fatalf("Error initializing Firebase Auth client: %v", err)
	}
}
