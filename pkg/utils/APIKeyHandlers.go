package utils

import (
	"fmt"
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/Abiji-2020/NexOrb/pkg/models"
	"github.com/google/uuid"
)

// GenerateUUID generates a new UUID
func GenerateAPIKey() string {
	return uuid.New().String()
}

func CreateAPIKey(log *logger.Logger, db *database.Database, userID string) (error, string) {
	apiKey := GenerateAPIKey()
	apiKeyObj := models.ApiKeys{
		ID:     uuid.New().String(),
		UserID: userID,
		Active: true,
		ApiKey: apiKey,
	}
	err := db.Instance.Create(&apiKeyObj).Error
	if err != nil {
		log.LogError(fmt.Sprintf("Error creating the API Key: %v", err))
		return err, ""
	}
	log.LogInfo("API Key created successfully")
	return nil, apiKey
}

func ValidateAPIKey(log *logger.Logger, db *database.Database, apiKey string) (error, string) {
	var apiKeyObj models.ApiKeys
	err := db.Instance.Where("api_key = ?", apiKey).First(&apiKeyObj).Error
	if err != nil {
		log.LogError(fmt.Sprintf("Error fetching the API Key: %v", err))
		return err, ""
	}
	if !apiKeyObj.Active {
		log.LogError("API Key is not active")
		return fmt.Errorf("API Key is not active"), ""
	}
	return nil, apiKeyObj.UserID
}
