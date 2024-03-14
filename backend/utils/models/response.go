package models

import (
	"github.com/gin-gonic/gin"
)

func GetStringPointer(val string) *string {
	return &val
}

// ErrorData defines generic error response of a REST call if any occurs
type ErrorData struct {
	ID            string `json:"id"`
	Handler       string `json:"handler"`
	Details       string `json:"details"`
	PublicMessage string `json:"publicMessage"`
}

// A GenericResponse is our response uniform wrapper for our rest endpoints.
// swagger:response genericResponse
// in: body
type GenericResponse struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data" swaggertype:"object"`
	Message *string     `json:"message"`
	Error   *ErrorData  `json:"error"`
}

// Build is a GenericResponse constructor
func Build(code int, data interface{}, message *string, error *ErrorData) GenericResponse {
	return GenericResponse{
		Code:    code,
		Message: message,
		Data:    data,
		Error:   error,
	}
}

// ErrorResponse template for error responses
func ErrorResponse(c *gin.Context, code int, error ErrorData) {
	c.JSON(code, Build(
		code,
		nil,
		GetStringPointer("error has occurred"),
		&error))
	c.Abort()
}

// ErrorResponseWithData template for error with data responses
func ErrorResponseWithData(c *gin.Context, code int, data interface{}, error ErrorData) {
	c.JSON(code, Build(
		code,
		data,
		GetStringPointer("error has occurred"),
		&error))
	c.Abort()
}

// OkResponse template for ok and successful responses
func OkResponse(c *gin.Context, code int, message string, data interface{}) {
	c.JSON(code, Build(
		code,
		data,
		GetStringPointer(message),
		nil))
	c.Abort()
}
