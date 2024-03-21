package helpers

import (
	"context"
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), "TETRIS_API", c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func ParsePageParams(c *gin.Context) Page {
	size := PageDefaultSize
	pageNo := PageDefaultNumber
	sortDirection := PageDefaultSortDirectionDesc
	sortBy := PageDefaultSortBy

	s, err := strconv.Atoi(c.Query("size"))
	if err == nil {
		size = s
	}

	n, err := strconv.Atoi(c.Query("page"))
	if err == nil {
		pageNo = n
	}

	sD, err := strconv.ParseBool(c.Query("sort_direction_desc"))
	if err == nil {
		sortDirection = sD
	}

	sB := c.Query("sort_by")
	if !strings.EqualFold(sB, "") {
		sortBy = sB
	}

	return Page{
		Number:            &pageNo,
		Size:              &size,
		SortBy:            &sortBy,
		SortDirectionDesc: &sortDirection,
	}
}

type fieldError struct {
	err validator.FieldError
}

// String returns the string format of the error
func (q fieldError) String() string {
	var sb strings.Builder

	sb.WriteString("validation failed on field '" + q.err.Field() + "'")
	sb.WriteString(", condition: must be " + q.err.ActualTag())

	// Print condition parameters, e.g. one of=red blue -> { red blue }
	if q.err.Param() != "" {
		sb.WriteString(" { " + q.err.Param() + " }")
	}

	if q.err.Value() != nil && q.err.Value() != "" {
		sb.WriteString(fmt.Sprintf(", actual: %v", q.err.Value()))
	}

	return sb.String()
}

// ValidateRequest validates the request struct to ensure it matches requirement
func ValidateRequest(request interface{}) error {
	validate := validator.New()
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})
	err := validate.Struct(request)
	if err != nil {
		var invalidValidationError *validator.InvalidValidationError
		if errors.As(err, &invalidValidationError) {
			return err
		}

		for _, fieldErr := range err.(validator.ValidationErrors) {
			return fmt.Errorf(fieldError{fieldErr}.String())
		}
	}

	return nil
}
