package config

import (
	"github.com/Abiji-2020/NexOrb/pkg/health"
	"github.com/Abiji-2020/NexOrb/pkg/signup"
	"github.com/gin-gonic/gin"
)

func (c *AppConfig) InitializeRoutes() {
	// Initialize a health route
	v1 := c.Router.Group("/v1/api")
	{
		v1.GET("/health", health.CheckHealth)
		v1.POST("/signup", func(context *gin.Context) {
			signup.SignUp(context, c.Logger, c.Database)
		})
	}

	// You can add other routes here for signup, signin, etc.
}
