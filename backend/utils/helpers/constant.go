package helpers

import "errors"

const (
	ZeroUUID             = "00000000-0000-0000-0000-000000000000"
	LogStrRequestIDLevel = "REQUEST_ID"
	LogStrKeyMethod      = "METHOD"
	StarPassword         = "**********"
)

var (
	ErrRecordCreationFailed = errors.New("error: record creation failed")
	ErrDeleteFailed         = errors.New("error: Delete failed")
	ErrEmptyResult          = errors.New("error: could not find list of games")
	ErrRecordNotFound       = errors.New("error: Record not found")
	ErrUserAlreadyExist     = errors.New("error: user already exist")
	ErrInvalidCredential    = errors.New("error: invalid email or password")
	ErrRecordUpdateFail     = errors.New("error: Unable to update record")
)
