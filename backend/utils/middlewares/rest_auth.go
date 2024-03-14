package middlewares

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/dark-vinci/tetris/backend/utils/helpers"
	"github.com/dark-vinci/tetris/backend/utils/models"
)

// AuthMiddleware authenticates a restful api call and inject the userID and userType into to context
func (m *Middleware) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := requestid.Get(c)
		bearerToken := c.Request.Header.Get("Authorization")

		if len(bearerToken) == 0 {
			models.ErrorResponse(c, http.StatusUnauthorized, models.ErrorData{
				ID:      requestID,
				Handler: packageName,
				//Details:       ErrMissingToken.Error(),
				PublicMessage: "auth token is missing",
			})
			return
		}
		if !strings.HasPrefix(bearerToken, "Bearer ") {
			models.ErrorResponse(c, http.StatusUnauthorized, models.ErrorData{
				ID:      requestID,
				Handler: packageName,
				//Details:       ErrInvalidTokenHeaderFormat.Error(),
				PublicMessage: "auth token is invalid",
			})
			return
		}

		userID, isAdmin, err := m.ParseToken(m.env, strings.TrimPrefix(bearerToken, "Bearer "))
		if err != nil {
			models.ErrorResponse(c, http.StatusUnauthorized, models.ErrorData{
				ID:      requestID,
				Handler: packageName,
				//Details:       ErrInvalidToken.Error(),
				PublicMessage: "token supplied is invalid/expired",
			})
			return
		}

		uID, err := uuid.Parse(userID)
		if err != nil {
			models.ErrorResponse(c, http.StatusBadRequest, models.ErrorData{
				ID:      requestID,
				Handler: packageName,
				//Details:       ErrUnauthorized.Error(),
				PublicMessage: "invalid user ID",
			})
			return
		}

		user, err := m.app.GetUser(c, uID)
		if err != nil || strings.EqualFold(user.ID.String(), helpers.ZeroUUID) {
			models.ErrorResponse(c, http.StatusNotFound, models.ErrorData{
				ID:      requestID,
				Handler: packageName,
				//Details:       ErrUnauthorized.Error(),
				PublicMessage: "no user found in this authorization context",
			})
			return
		}

		c.Set(UserIDInContext, userID)
		c.Set(IsAdminInContext, isAdmin)
		c.Header(IsAdminOnHeaders, fmt.Sprint(isAdmin))
		c.Next()
	}
}

// CorsMiddleware adds a CORS check for api rest endpoints allowing only list of origins defined in env
func (m *Middleware) CorsMiddleware() gin.HandlerFunc {
	return cors.New(cors.DefaultConfig())
}
