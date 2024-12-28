package signup

import (
	"fmt"
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/Abiji-2020/NexOrb/pkg/models"
	"github.com/Abiji-2020/NexOrb/pkg/utils"
	"github.com/google/uuid"
)

// SignUp creates a new user
func CreateUser(request SignupRequest, log *logger.Logger, db *database.Database) (error, *SignupResponse) {
	if request.OrganizationID == "" && request.OrganizationName == "" {
		log.LogError("Organization ID or Name is required")
		return fmt.Errorf("Organization ID or Name is required"), nil
	}
	var org models.Organizations
	if request.OrganizationID == "" {
		org = models.Organizations{
			ID:      uuid.New().String(),
			Name:    request.OrganizationName,
			URL:     request.OrganizationURL,
			Country: request.OrganizationCountry,
		}
		err := db.Instance.Create(&org).Error
		if err != nil {
			log.LogError(fmt.Sprintf("Error creating the organization: %v", err))
			return err, nil
		}
	} else {
		err := db.Instance.Where("id = ?", request.OrganizationID).First(&org).Error
		if err != nil {
			log.LogError(fmt.Sprintf("Error fetching the organization: %v", err))
		}
	}
	user := models.Users{
		ID:             uuid.New().String(),
		Email:          request.Email,
		Password:       request.Password,
		FirstName:      request.FirstName,
		LastName:       request.LastName,
		OrganizationID: org.ID,
		Role:           request.Role,
		AvatarImage:    request.AvatarImage,
		DateOfBirth:    request.DateOfBirth,
	}
	err := db.Instance.Create(&user).Error
	if err != nil {
		log.LogError(fmt.Sprintf("Error creating the user: %v", err))
		return err, nil
	}
	log.LogInfo("User created successfully")
	err = db.Instance.Where("id = ?", user.ID).First(&user).Error
	if err != nil {
		log.LogError(fmt.Sprintf("Error fetching the user: %v", err))
		return err, nil
	}
	err, apiKey := utils.CreateAPIKey(log, db, user.ID)
	if err != nil {
		log.LogError(fmt.Sprintf("Error creating the API Key: %v", err))
		return err, nil
	}
	return nil, &SignupResponse{
		ID:                  user.ID,
		Email:               user.Email,
		FirstName:           user.FirstName,
		LastName:            user.LastName,
		DateOfBirth:         user.DateOfBirth,
		CreatedAt:           user.CreatedAt,
		UpdatedAt:           user.UpdatedAt,
		OrganizationName:    org.Name,
		OrganizationURL:     org.URL,
		OrganizationCountry: org.Country,
		Role:                user.Role,
		APIKey:              apiKey,
	}

}
