package middleware

import (
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/Abiji-2020/NexOrb/pkg/utils"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"fmt"
)

// AuthMiddleware checks if the user is authenticated, except for the sign-in, sign-up, and health routes.

func AuthMiddleware(log *logger.Logger, db *database.Database) gin.HandlerFunc {
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
		if err := validateToken(token, log, db); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func validateToken(token string, log *logger.Logger, db *database.Database) error {
	err, apiKey := utils.ValidateAPIKey(log, db, token)
	if err != nil {
		log.LogError("Error validating the API Key")
		return err 
	}
	if apiKey == "" || len(apiKey) == 0 {
		log.LogError("API Key is empty")
		return fmt.Errorf("API Key is empty")
	}
	return nil
}
