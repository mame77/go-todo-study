package port

import (
	"github.com/google/uuid"
	"github.com/mame77/go-todo-study/internal/entity"
)

type TokenRepository interface {
	AddWhitelist(*entity.RefreshToken) error
	RemoveWhitelist(uuid.UUID) error
	InWhitelist(uuid.UUID) (bool, error)
}
