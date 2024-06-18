package controllers

import "github.com/gin-gonic/gin"

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
