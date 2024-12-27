package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

// AuthMiddleware checks if the user is authenticated, except for the sign-in, sign-up, and health routes.

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		exemptRoutes := []string{"/v1/api/signin", "/v1/api/signup", "/v1/api/health"}
		requestPath := c.Request.URL.Path
		for _, route := range exemptRoutes {
			if strings.HasPrefix(requestPath, route) {
				c.Next()
				return
			}
		}
		token := c.GetHeader("Authorization")
		if err := validateToken(token); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func validateToken(token string) error {
}
