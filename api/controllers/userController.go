package controllers

import (
	"api/initializers"
	"api/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CreateUserRequest struct {
	Email  string `form:"email" binding:"required,email"`
	Name   string `form:"name" binding:"required"`
	RoleID uint   `form:"role_id" binding:"required"`
}

type UserListResponse struct {
	ID            uint   `json:"id"`
	Name          string `json:"name"`
	Email         string `json:"email"`
	RoleName      string `json:"role_name"`
	DeactivatedAt string `json:"deactivated_at"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
}

func CreateUser(c *gin.Context) {
	// Validate the request
	var request CreateUserRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(400, gin.H{
			"metadata": gin.H{
				"message": "Invalid request",
				"error":   err.Error(),
			},
		})
		return
	}

	// Check if the role exists
	var role models.Role
	if err := initializers.DB.First(&role, request.RoleID).Error; err != nil {
		c.JSON(400, gin.H{
			"metadata": gin.H{
				"message": "Invalid Role ID",
				"error":   err.Error(),
			},
		})
		return
	}

	// Check if the email already exists
	var existingUser models.Users
	if err := initializers.DB.Where("email = ?", request.Email).First(&existingUser).Error; err == nil {
		c.JSON(400, gin.H{
			"metadata": gin.H{
				"message": "Email already exist",
				"error":   "validation_error",
			},
		})
		return
	}

	// Create a new user in the database
	user := models.Users{Name: request.Name, Email: request.Email, RoleID: request.RoleID}
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
	var count int64

	// Get page number from query string, default to 1 if it doesn't exist
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	// Get page size from query string, default to 10 if it doesn't exist
	perPage, _ := strconv.Atoi(c.DefaultQuery("perPage", "10"))

	// Calculate offset
	offset := (page - 1) * perPage

	// Count total number of users
	initializers.DB.Model(&models.Users{}).Count(&count)

	result := initializers.DB.Model(&models.Users{}).
		Select("users.id", "users.email", "users.name", "users.deactivated_at", "users.created_at", "users.updated_at", "roles.name as role_name").
		Joins("left join roles on users.role_id = roles.id").
		Order("users.created_at DESC").
		Offset(offset). // Add offset
		Limit(perPage). // Limit the number of users
		Find(&users)

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
			"message":  "Users fetched successfully",
			"page":     page,
			"per_page": perPage,
			"total":    count,
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
