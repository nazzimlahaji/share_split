package controllers

import (
	"api/initializers"
	"api/models"
	"errors"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// 'CreateUser'
type CreateUserRequest struct {
	Email  string `form:"email" binding:"required,email"`
	Name   string `form:"name" binding:"required"`
	RoleID uint   `form:"role_id" binding:"required"`
}

// 'UserList'
type UserListResponse struct {
	ID            uint   `json:"id"`
	Uuid          string `json:"uuid"`
	Name          string `json:"name"`
	Email         string `json:"email"`
	RoleName      string `json:"role_name"`
	DeactivatedAt string `json:"deactivated_at"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
}

type UserListParams struct {
	Page    int `form:"page" binding:"required,gt=0"`     // Ensure page is greater than 0
	PerPage int `form:"per_page" binding:"required,gt=0"` // Ensure per_page is greater than 0
}

// 'UserDetail'
// The response will be using the 'UserListResponse' struct because it has same fields required

type UserDetailBinding struct {
	Uuid string `uri:"uuid" binding:"required,uuid"`
}

func CreateUser(c *gin.Context) {
	// Validate the request
	var request CreateUserRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(422, gin.H{
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
	var query UserListParams
	var count int64

	// Validate the params
	if err := c.ShouldBindQuery(&query); err != nil {
		c.JSON(400, gin.H{
			"metadata": gin.H{
				"message": "Invalid request",
				"error":   err.Error(),
			},
		})
		return
	}

	// Calculate offset for pagination
	offset := (query.Page - 1) * query.PerPage

	// Count total number of users
	initializers.DB.Model(&models.Users{}).Count(&count)

	// Fetch users with pagination and join roles
	result := initializers.DB.Model(&models.Users{}).
		Select("users.id", "users.uuid", "users.email", "users.name", "users.deactivated_at", "users.created_at", "users.updated_at", "roles.name as role_name").
		Joins("left join roles on users.role_id = roles.id").
		Order("users.created_at DESC").
		Offset(offset).       // Add offset for pagination
		Limit(query.PerPage). // Limit the number of users per page
		Find(&users)

	if result.Error != nil {
		c.JSON(500, gin.H{
			"metadata": gin.H{
				"message": "Internal server error",
				"error":   result.Error.Error(),
			},
		})
		return
	}

	// Return the user list with pagination metadata
	c.JSON(200, gin.H{
		"metadata": gin.H{
			"message":  "Users fetched successfully",
			"page":     query.Page,
			"per_page": query.PerPage,
			"total":    count,
		},
		"data": users,
	})
}

func UserDetail(c *gin.Context) {
	var uri UserDetailBinding

	// Using the UserListResponse struct because it has the same fields required
	var user UserListResponse

	// Validate the Uri and bind the user
	if err := c.ShouldBindUri(&uri); err != nil {
		c.JSON(422, gin.H{
			"metadata": gin.H{
				"message": "Invalid request",
				"error":   err.Error(),
			},
		})
		return
	}

	// Validate the UUID
	result := initializers.DB.Model(&models.Users{}).
		Where("uuid = ?", uri.Uuid).
		Select("users.id", "users.uuid", "users.email", "users.name", "users.deactivated_at", "users.created_at", "users.updated_at", "roles.name as role_name").
		Joins("left join roles on users.role_id = roles.id").
		First(&user)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(404, gin.H{
				"metadata": gin.H{
					"message": "User not found",
					"error":   result.Error.Error(),
				},
			})
		} else {
			c.JSON(500, gin.H{
				"metadata": gin.H{
					"message": "Internal server error",
					"error":   result.Error.Error(),
				},
			})
		}
		return
	}

	c.JSON(200, gin.H{
		"metadata": gin.H{
			"message": "User fetched successfully",
		},
		"data": user,
	})
}
