package signup

import (
	"time"
)

type SignupRequest struct {
	Email               string    `json:"email"`
	Password            string    `json:"password"`
	FirstName           string    `json:"first_name"`
	LastName            string    `json:"last_name"`
	DateOfBirth         time.Time `json:"date_of_birth"`
	AvatarImage         []byte    `json:"avatar_image"`
	OrganizationName    string    `json:"organization_name,omitempty"`
	OrganizationURL     string    `json:"organization_url,omitempty"`
	OrganizationCountry string    `json:"organization_country,omitempty"`
	OrganizationID      string    `json:"organization_id,omitempty"`

	Role string `json:"role"`
}

type SignupResponse struct {
	ID                  string    `json:"id"`
	Email               string    `json:"email"`
	FirstName           string    `json:"first_name"`
	LastName            string    `json:"last_name"`
	DateOfBirth         time.Time `json:"date_of_birth"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
	OrganizationName    string    `json:"organization_name"`
	OrganizationURL     string    `json:"organization_url"`
	OrganizationCountry string    `json:"organization_country"`
	Role                string    `json:"role"`
	APIKey              string    `json:"apikey"`
}
