package models

import (
	"time"
)

type Users struct {
	ID             string        `gorm:"primaryKey"`                // Primary key as string
	Email          string        `gorm:"unique"`                    // Unique email
	FirstName      string        `gorm:"not null"`                  // Not null field for first name
	LastName       string        `gorm:"not null"`                  // Not null field for last name
	DateOfBirth    time.Time     `gorm:"not null"`                  // Not null field for date of birth
	AvatarImage    []byte        `gorm:"type:bytea"`                // Avatar image as bytea type
	CreatedAt      time.Time     `gorm:"autoCreateTime"`            // Auto create time for the user
	UpdatedAt      time.Time     `gorm:"autoUpdateTime"`            // Auto update time for the user
	Organizations  Organizations `gorm:"foreignKey:OrganizationID"` // Foreign key to Organizations
	OrganizationID string        `gorm:"not null"`                  // Organization ID field (string type)
	Password       string        `gorm:"not null"`                  // User password
	Role           string        `gorm:"not null"`                  // User role
}
