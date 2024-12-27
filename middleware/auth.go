package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

// AuthMiddleware checks if the user is authenticated, except for the sign-in, sign-up, and health routes.
// It expects an Authorization header with a valid token (for example, "valid_token") for protected routes.
// The middleware allows the following routes to be accessed without authentication:
// - /v1/api/signin
// - /v1/api/signup
// - /v1/api/health
// @Summary Auth middleware
// @Description This middleware checks if the user is authenticated for all routes except for sign-in, sign-up, and health.
// @Tags middleware
// @Accept json
// @Produce json
// @Success 200 {object} map[string]string "Authentication successful"
// @Failure 401 {object} map[string]string "Unauthorized"
// @Router /v1/api/* [get, post]  // Apply this middleware to all routes under /v1/api/ path
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
