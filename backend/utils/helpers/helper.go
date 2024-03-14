package helpers

import (
	"context"

	"github.com/gin-gonic/gin"
)

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), "TETRIS_API", c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
