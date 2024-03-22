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
	//JUST FOR THE DEV
	//os.Setenv("DB_PASSWORD", "docker")
	//os.Setenv("DB_NAME", "tetris")
	//os.Setenv("DB_USERNAME", "docker")
	//os.Setenv("DB_HOST", "localhost")
	//os.Setenv("DB_PORT", "5420")
	//os.Setenv("JWT_SIGNING_SECRET", "tomiwa")
	//os.Setenv("PORT", "8080")

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
