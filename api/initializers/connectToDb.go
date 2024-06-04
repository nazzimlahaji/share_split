package initializers

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type AppConfig struct {
	Hostname     string
	Port         string
	User         string
	Password     string
	DatabaseName string
	SSLMode      string
}

var DB *gorm.DB

func ConnectToDb() {
	// Create an instance of AppConfig
	appConfig := AppConfig{
		Hostname:     os.Getenv("POSTGRES_HOSTNAME"),
		Port:         os.Getenv("POSTGRES_PORT"),
		User:         os.Getenv("POSTGRES_USER"),
		Password:     os.Getenv("POSTGRES_PASSWORD"),
		DatabaseName: os.Getenv("POSTGRES_DATABASENAME"),
		SSLMode:      os.Getenv("POSTGRES_SSLMODE"),
	}

	// Timezone is set to default (UTC)
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		appConfig.Hostname,
		appConfig.User,
		appConfig.Password,
		appConfig.DatabaseName,
		appConfig.Port,
		appConfig.SSLMode,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to db")
	}
}
