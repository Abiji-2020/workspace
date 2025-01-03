package models

import (
	"time"
)

type ApiKeys struct {
	ID        string    `gorm:"primaryKey"`        // Primary key as string
	ApiKey    string    `gorm:"unique;not null"`   // API key (unique and not null)
	Active    bool      `gorm:"default:true"`      // Default active status
	CreatedAt time.Time `gorm:"autoCreateTime"`    // Auto create time for API key
	UpdatedAt time.Time `gorm:"autoUpdateTime"`    // Auto update time for API key
	User      Users     `gorm:"foreignKey:UserID"` // Foreign key to Users
	UserID    string    `gorm:"not null"`          // User ID field (string type)
}
