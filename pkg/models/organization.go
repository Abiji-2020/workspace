package models

import (
	"time"
)

type Organizations struct {
	ID        uint      `gorm:"primaryKey"`
	Name      string    `gorm:"not null"`
	URL       string    `gorm:"not null"`
	Country   string    `gorm:"not null"`
	Users     []Users   `gorm:"foreignKey:OrganizationID"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
