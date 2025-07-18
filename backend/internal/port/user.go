package port

import "github.com/mame77/go-todo-study/internal/entity"

type UserRepository interface {
	Create(*entity.User) error
}
