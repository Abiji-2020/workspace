package database

import (
	"fmt"
	"github.com/Abiji-2020/NexOrb/logger"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

type Database struct {
	Instance *gorm.DB
}

func InitDatabase(log *logger.Logger) *Database {
	log.LogInfo("Initializing the database")

	err := godotenv.Load()
	if err != nil {
		log.LogError("Error loading .env file")
		return nil
	}

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.LogError(fmt.Sprintf("Error connecting to the Postgres: %v", err))
		return nil
	}

	log.LogInfo("Connected to the database")

	dbName := os.Getenv("DB_NAME")
	err = createDatabase(db, dbName, log)
	if err != nil {
		log.LogError(fmt.Sprintf("Error creating the database: %v", err))
		return nil
	}

	dsn = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbName)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.LogError(fmt.Sprintf("Error connecting to the database: %v", err))
		return nil
	}
	return &Database{Instance: db}
}

func createDatabase(db *gorm.DB, dbName string, log *logger.Logger) error {
	var result string

	err := db.Raw("SELECT 1 FROM pg_database WHERE datname = ?", dbName).Scan(&result).Error
	if err != nil || result != "1" {
		log.LogInfo("Database does not exist. Creating a new database")
		err = db.Exec(fmt.Sprintf("CREATE DATABASE %s", dbName)).Error

		if err != nil {
			return err
		}
		log.LogInfo("Database created successfully")
		return nil
	}

	log.LogInfo("Database already exists")
	return nil
}
