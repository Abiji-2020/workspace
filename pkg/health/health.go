package health

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// CheckHealth godoc
// @Summary Check health of the application
// @Description Check health of the application
// @Tags health
// @Accept json
// @Produce json
// @Success 200 {object} map[string]string "Status of the application"
// @Router /health [get]
func CheckHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "UP",
	})
}
