package config

import (
	"github.com/Abiji-2020/NexOrb/pkg/models"
)

// MigrateDatabase migrates the database schema
func (c *AppConfig) MigrateDatabase() error {
	err := c.Database.Instance.AutoMigrate(&models.Users{}, &models.Organizations{})
	if err != nil {
		return err
	}
	return nil
}
