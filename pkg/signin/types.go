package signin

type SignInRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignInResponse struct {
	ID             string `json:"id"`
	Email          string `json:"email"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	CreatedAt      string `json:"created_at"`
	UpdatedAt      string `json:"updated_at"`
	OrganizationID string `json:"organization_id"`
	Role           string `json:"role"`
	APIKey         string `json:"apikey"`
}

type UserNotFoundResponse struct {
	Message string `json:"message"`
}

type SignInInvalidPasswordResponse struct {
	Email   string `json:"email"`
	Message string `json:"message"`
}

type GeneralErrorResponse struct {
	Message    string `json:"message"`
	StatusCode int    `json:"status_code"`
}
