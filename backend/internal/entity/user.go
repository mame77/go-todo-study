package entity

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

const (
	MIN_USER_NAME_LENGTH = 1
	MAX_USER_NAME_LENGTH = 64
)

var (
	ErrUserIdRequired        = errors.New("User 'id' is required")
	ErrUserNameRequired      = errors.New("User 'name' is required")
	ErrUserGoogleIdRequired  = errors.New("User 'googleId' is required")
	ErrInvalidUserNameLength = errors.New("invalid User 'name' length")
	ErrUserTimeZero          = errors.New("the time related User is zero")
	ErrUserInvalidPermission = errors.New("user invalid permission")
)

// NewUser関数の戻り値の場所、ポインタの場所
type User struct {
	id        uuid.UUID
	name      string
	email     Email
	google_id string
	createdAt time.Time
	updatedAt time.Time
}

// バリデーションをかけれる。戻り値はUserのpointer
func NewUser(id uuid.UUID, name, googleId string, email Email, createdAt, updatedAt time.Time) (*User, error) {
	if id == uuid.Nil {
		return nil, ErrUserIdRequired
	}
	if name == "" {
		return nil, ErrUserNameRequired
	}
	if googleId == "" {
		return nil, ErrUserGoogleIdRequired
	}
	if len(name) < MIN_USER_NAME_LENGTH || len(name) > MAX_USER_NAME_LENGTH {
		return nil, ErrInvalidUserNameLength
	}
	if createdAt.IsZero() || updatedAt.IsZero() {
		return nil, ErrUserTimeZero
	}
	return &User{
		id:        id,
		name:      name,
		email:     email,
		google_id: googleId,
		createdAt: createdAt,
		updatedAt: updatedAt,
	}, nil
}

////ここまでは理解した-----------------------------

// レシーバ関数がよくわからない
func (u *User) Id() uuid.UUID {
	return u.id
}

func (u *User) GoogleId() string {
	return u.google_id
}

func (u *User) Name() string {
	return u.name
}

func (u *User) Email() Email {
	return u.email
}

func (u *User) CreatedAt() time.Time {
	return u.createdAt
}

func (u *User) UpdatedAt() time.Time {
	return u.updatedAt
}
