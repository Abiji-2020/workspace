package config

import (
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/gin-gonic/gin"
)

type AppConfig struct {
	Router     *gin.Engine
	Logger     *logger.Logger
	ServerPort string
	Database   *database.Database
}

// NewConfig initializes a new AppConfig instance
func NewConfig() *AppConfig {
	// Initialize the logger
	log := logger.InitLogger()

	// Initialize the Gin router
	router := gin.Default()
	db := database.InitDatabase(log)
	if db == nil {
		log.LogError("Error initializing the database")
		return nil
	}

	return &AppConfig{
		Router:     router,
		Logger:     log,
		ServerPort: "8080",
		Database:   database.InitDatabase(log),
	}
}
