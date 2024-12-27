package models

import (
	"time"
)

type Users struct {
	ID             uint          `gorm:"primaryKey"`
	Email          string        `gorm:"unique"`
	FirstName      string        `gorm:"not null"`
	LastName       string        `gorm:"not null"`
	DateOfBirth    time.Time     `gorm:"not null"`
	AvatarImage    []byte        `gorm:"type:bytea"`
	CreatedAt      time.Time     `gorm:"autoCreateTime"`
	UpdatedAt      time.Time     `gorm:"autoUpdateTime"`
	Organizations  Organizations `gorm:"foreignKey:OrganizationID"`
	OrganizationID uint          `gorm:"not null"`
	Password       string        `gorm:"not null"`
}
