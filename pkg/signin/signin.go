package signin

import (
	"fmt"
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/Abiji-2020/NexOrb/pkg/models"
	"github.com/Abiji-2020/NexOrb/pkg/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

// SignIn signs in a user
// SignIn godoc
// @Summary Signs in a user
// @Description Signs in a user
// @Tags signin
// @Accept json
// @Produce json
// @Param request body SignInRequest true "Signin Request Payload"
// @Success 200 {object} SignInResponse "User signed in successfully"
// @Failure 400 {object} GeneralErrorResponse "Error message"
// @Failure 401 {object} GeneralErrorResponse "Unauthorized"
// @Failure 404 {object} UserNotFoundResponse "User not found"
// @Failure 422 {object} SignInInvalidPasswordResponse "Invalid sign in request Password"
// @Failure 500 {object} GeneralErrorResponse "Internal Server Error"
// @Router /signin [post]
func SignIn(c *gin.Context, log *logger.Logger, db *database.Database) {

	var request SignInRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		log.LogError(fmt.Sprintf("Error binding the request: %v", err))
		errResponse := GeneralErrorResponse{
			Message:    "Some values are missing or not validated",
			StatusCode: http.StatusBadRequest,
		}
		c.JSON(http.StatusBadRequest, errResponse)
		return
	}

	// Check if the user exists
	var user models.Users
	err := db.Instance.Where("email = ?", request.Email).First(&user).Error
	if err != nil {
		log.LogError(fmt.Sprintf("Error fetching the user: %v", err))
		errResponse := UserNotFoundResponse{
			Message: "User not found",
		}
		c.JSON(http.StatusNotFound, errResponse)
		return
	}

	// Validate the password
	if !utils.ComparePasswords(user.Password, request.Password) {
		log.LogError("Invalid password")
		errResponse := SignInInvalidPasswordResponse{
			Email:   user.Email,
			Message: "Invalid password",
		}
		c.JSON(http.StatusUnprocessableEntity, errResponse)
		return
	}

	// Create an API key
	err, apiKey := utils.CreateAPIKey(log, db, user.ID)
	if err != nil {
		log.LogError(fmt.Sprintf("Error creating the API key: %v", err))
		errResponse := GeneralErrorResponse{
			Message:    "Error creating the API key",
			StatusCode: http.StatusInternalServerError,
		}
		c.JSON(http.StatusInternalServerError, errResponse)
		return
	}

	// Prepare the response
	resp := SignInResponse{
		ID:             user.ID,
		Email:          user.Email,
		FirstName:      user.FirstName,
		LastName:       user.LastName,
		CreatedAt:      user.CreatedAt.String(),
		UpdatedAt:      user.UpdatedAt.String(),
		OrganizationID: user.OrganizationID,
		Role:           user.Role,
		APIKey:         apiKey,
	}
	c.JSON(http.StatusOK, resp)

}
