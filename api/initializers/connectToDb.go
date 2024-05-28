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
	TimeZone     string
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
		TimeZone:     os.Getenv("POSTGRES_TIMEZONE"),
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		appConfig.Hostname,
		appConfig.User,
		appConfig.Password,
		appConfig.DatabaseName,
		appConfig.Port,
		appConfig.SSLMode,
		appConfig.TimeZone,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to db")
	}
}
