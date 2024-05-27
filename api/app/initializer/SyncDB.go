package initializers

import "app/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.Users{})
}
