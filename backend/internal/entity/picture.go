package entity

import (
	"errors"
)

const (
	DEFAULT_PICTURE_URL = "wakaran"
)

var (
	ErrPictureRequired = errors.New("picture required")
)
