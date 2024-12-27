package config

import (
	"github.com/Abiji-2020/NexOrb/database"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/Abiji-2020/NexOrb/pkg/health"
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

	return &AppConfig{
		Router:     router,
		Logger:     log,
		ServerPort: "8080",
		Database:   database.InitDatabase(log),
	}
}

func (c *AppConfig) InitializeRoutes() {
	// Initialize a health route
	v1 := c.Router.Group("/v1/api")
	{
		v1.GET("/health", health.CheckHealth)
	}

	// You can add other routes here for signup, signin, etc.
}
