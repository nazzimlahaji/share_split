package helpers

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

func FormatValidationErrors(err error) map[string]string {
	validationErrors := err.(validator.ValidationErrors)

	errors := make(map[string]string)
	for _, e := range validationErrors {
		errors[e.Field()] = extractErrorMessage(e.Error())
	}
	return errors
}

func extractErrorMessage(errMsg string) string {
	if idx := strings.Index(errMsg, "Error:"); idx != -1 {
		return strings.TrimSpace(errMsg[idx+6:])
	}
	return errMsg
}
