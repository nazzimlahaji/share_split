package controllers

import (
	"api/initializers"
	"api/models"

	"github.com/gin-gonic/gin"
)

type RoleListResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

func RoleList(c *gin.Context) {
	var role []RoleListResponse

	result := initializers.DB.Model(&models.Role{}).Select("id", "name").Find(&role)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"metadata": gin.H{
				"message": "Error fetching roles",
				"error":   result.Error.Error(),
			},
		})
		return
	}

	c.JSON(200, gin.H{
		"metadata": gin.H{
			"message": "Roles fetched successfully",
		},
		"data": role,
	})

}
