package models

import "os"

type Env struct {
	DBPassword            string
	DBName                string
	DBUsername            string
	DBHOST                string
	DBPort                string
	JWTAccessTokenExpiry  string
	JWTRefreshTokenExpiry string
	JWTSigningSecret      string
	PORT                  string
}

func NewEnv() *Env {
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbUsername := os.Getenv("DB_USERNAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	jwtAccessTokenExpiry := os.Getenv("JWT_ACCESS_TOKEN_EXPIRY")
	jwtRefreshTokenExpiry := os.Getenv("JWT_REFRESH_TOKEN_EXPIRY")
	jwtSigningSecret := os.Getenv("JWT_SIGNING_SECRET")
	port := os.Getenv("PORT")

	return &Env{
		DBPassword:            dbPass,
		DBName:                dbName,
		DBUsername:            dbUsername,
		DBHOST:                dbHost,
		DBPort:                dbPort,
		JWTAccessTokenExpiry:  jwtAccessTokenExpiry,
		JWTRefreshTokenExpiry: jwtRefreshTokenExpiry,
		JWTSigningSecret:      jwtSigningSecret,
		PORT:                  port,
	}
}
