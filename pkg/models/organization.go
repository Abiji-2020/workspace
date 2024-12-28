package models

import (
	"time"
)

type Organizations struct {
	ID        string    `gorm:"primaryKey"`                // Primary key as string
	Name      string    `gorm:"not null"`                  // Organization name
	URL       string    `gorm:"not null"`                  // Organization URL
	Country   string    `gorm:"not null"`                  // Organization country
	Users     []Users   `gorm:"foreignKey:OrganizationID"` // Foreign key to Users
	CreatedAt time.Time `gorm:"autoCreateTime"`            // Auto create time for organization
	UpdatedAt time.Time `gorm:"autoUpdateTime"`            // Auto update time for organization
}
