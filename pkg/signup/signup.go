package signup

import (
	"fmt"
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Signup godoc
// @Summary Creating  a new user
// @Description Create a new user along with creating an orgnaization or joining an exisiting organization
// @Tags signup
// @Accept json
// @Produce json
// @Param request body SignupRequest true "Signup Request Payload"
// @Success 200 {object} SignupResponse "User created successfully"
// @Failure 400 {object} map[string]string "Error message"
// @Failure 401 {object} map[string]string "Unauthorized"
// @Failure 500 {object} map[string]string "Internal Server Error"
// @Router /signup [post]
func SignUp(c *gin.Context, log *logger.Logger, db *database.Database) {

	var request SignupRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		log.LogError(fmt.Sprintf("Error binding the request: %v", err))
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create a new user
	err, resp := CreateUser(request, log, db)
	if err != nil {
		log.LogError(fmt.Sprintf("Error creating the user: %v", err))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating the user"})
		return
	}
	c.JSON(http.StatusOK, resp)

}
