package port

import "github.com/mame77/go-todo-study/internal/entity"

type GithubRepository interface {
	CodeAuthorization(code string) (*entity.GithubUser, error)
}
