package entity

import (
	"error"
	"time"

	"github.com/google/uuid"
)

const (
	MIN_USER_NAME_LENGTH = 1
	MAX_USER_NAME_LENGTH = 20
)

var (
	ErrInvalibdUserNameLength = error.New("username length")
	ErrUserTimeZero = error.New("time over")
)

type User struct(
	id        	uuid.uuid
	name      	string
	email     	string
	google_id 	string
	createdAt 	time.Time
	updatedAt 	time.Time

)

func NewUser(id uuid.uuid,name,email,google_id string,createdAt,updatedAt time.Time)(*user,error){
	if len(name) < MIN_USER_NAME_LENGTH || len(name) > MAX_USER_NAME_LENGTH{
		return nil,ErrInvalibdUserNameLength
	}
	if createdAt.IsZero() || updatedAt.IsZero() {
		return nil, ErrUserTimeZero
	}
	return &User{
		id:      	  	id,
		name:     	 	name,
		email:     		email,
		google_id: 		google_id,
		createdAt: 		createdAt,
		updatedAt: 		updatedAt,
	}, nil
}
