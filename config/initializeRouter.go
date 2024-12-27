package config

import (
	"github.com/Abiji-2020/NexOrb/pkg/health"
)

func (c *AppConfig) InitializeRoutes() {
	// Initialize a health route
	v1 := c.Router.Group("/v1/api")
	{
		v1.GET("/health", health.CheckHealth)
	}

	// You can add other routes here for signup, signin, etc.
}
