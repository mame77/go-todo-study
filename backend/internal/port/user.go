package port

import (
	"github.com/google/uuid"
	"github.com/mame77/go-todo-study/internal/entity"
)

type UserRepository interface {
	Create(*entity.User) error
	FindById(uuid.UUID) (*entity.User, error)
	FindByGoogleId(string) (*entity.User, error)
	FindByGithubId(string) (*entity.User, error)
}
