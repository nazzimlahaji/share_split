package middleware

import (
	"api/initializers"
	"api/models"
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"metadata": gin.H{
					"message": "Authorization header is required",
				},
			})
			c.Abort()
			return
		}

		// Split the header to get the token part
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{
				"metadata": gin.H{
					"message": "Invalid token format",
				},
			})
			c.Abort()
			return
		}

		// Verify the token with Firebase
		token, err := initializers.AuthClient.VerifyIDToken(context.Background(), tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"metadata": gin.H{
					"message": "Invalid token",
				},
			})
			c.Abort()
			return
		}

		// Check if the user exists in the database using the email from the token
		var user models.Users
		if err := initializers.DB.Where("email = ?", token.Claims["email"]).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"metadata": gin.H{
					"message": "User not found",
				},
			})
			c.Abort()
			return
		}

		// User is authenticated, set user in context
		c.Set("user", user)
		c.Next()
	}
}
