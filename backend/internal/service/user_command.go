package service

import (
	"time"

	"github.com/google/uuid"
	"github.com/mame77/go-todo-study/internal/entity"
	"github.com/mame77/go-todo-study/internal/port"
)

// portとentityに依存

type UserCommandService struct {
	userRepository port.UserRepository
}

// ユーザーリポジトリチェック
func NewUserCommandService(userRepository port.UserRepository) *UserCommandService {
	if userRepository == nil {
		panic("nil userRepository")
	}
	return &UserCommandService{
		userRepository: userRepository,
	}
}

type UserCreateCommandInput struct {
	GoogleId string
	Name     string
	Email    string
}

type UserCreateCommandOutput struct {
	Id    uuid.UUID
	Name  string
	Email string
}

// ユーザーを新規作成する--苦手なやつだ
func (s *UserCommandService) CreateUser(cmd UserCreateCommandInput) (*UserCreateCommandOutput, error) {

	// email
	email, err := entity.NewEmail(cmd.Email)
	if err != nil {
		return nil, err
	}
	// id作成
	id, err := uuid.NewV7()
	if err != nil {
		return nil, err
	}
	// ユーザー作成
	user, err := entity.NewUser(
		id,
		cmd.Name,
		cmd.GoogleId,
		email,
		time.Now(),
		time.Now(),
	)
	if err != nil {
		return nil, err
	}

	//リポジトリで作成
	err = s.userRepository.Create(user)
	if err != nil {
		return nil, err
	}
	return &UserCreateCommandOutput{
		Id:    user.Id(),
		Name:  user.Name(),
		Email: user.Email().String(),
	}, nil
}
