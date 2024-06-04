package controllers

import (
	"api/helpers"
	"api/initializers"
	"api/models"

	"github.com/gin-gonic/gin"
)

type CreateUserRequest struct {
	Email string `form:"email" binding:"required,email"`
	Name  string `form:"name" binding:"required"`
}

type UserListResponse struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

func CreateUser(c *gin.Context) {
	// Validate the request
	var request CreateUserRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(400, gin.H{
			"metadata": gin.H{
				"message": "Invalid request",
				"error":   helpers.FormatValidationErrors(err),
			},
		})
		return
	}

	// Create a new user in the database
	user := models.Users{Name: request.Name, Email: request.Email}
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"metadata": gin.H{
				"message": "Error creating user",
				"error":   result.Error.Error(),
			},
		})
		return
	}

	// Return a success response
	c.JSON(200, gin.H{
		"metadata": gin.H{
			"message": "User created successfully",
		},
	})
}

func UserList(c *gin.Context) {
	var users []UserListResponse
	result := initializers.DB.Model(&models.Users{}).Select("id", "email", "name", "created_at", "updated_at").Find(&users)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"metadata": gin.H{
				"message": "Error fetching users",
				"error":   result.Error.Error(),
			},
		})
		return
	}

	c.JSON(200, gin.H{
		"metadata": gin.H{
			"message": "Users fetched successfully",
		},
		"data": users,
	})
}

func Whoami(c *gin.Context) {
	// Get the user from the context
	user := c.MustGet("user")

	// Return the user details
	c.JSON(200, gin.H{
		"metadata": gin.H{
			"message": "User fetched successfully",
		},
		"data": user,
	})
}
