package middleware

import (
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/Abiji-2020/NexOrb/pkg/utils"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
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
	err, _ := utils.ValidateAPIKey(log, db, token)
	return err
}
