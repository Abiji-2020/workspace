package utils

func ComparePasswords(userPassword string, requestPassword string) bool {
	return userPassword == requestPassword
}
