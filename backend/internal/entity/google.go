package entity

import "errors"

var (
	ErrGoogleUserIdRequired   = errors.New("GoogleUser 'id' is required")
	ErrGoogleUserNameRequired = errors.New("GoogleUser 'name' is required")
)

type GoogleUser struct {
	id    string
	name  string
	email Email // ここのEmailの型が大文字でできるのは同じentityそうだからいちいちimportしなくていいのかな
}

func NewGoogleUser(id, name, email string) (*GoogleUser, error) {
	if id == "" {
		return nil, ErrGoogleUserIdRequired
	}
	if name == "" {
		return nil, ErrGoogleUserNameRequired
	}
	mail, err := NewEmail(email) // キターーーNewEmail関数でバリデーションだ!
	if err != nil {
		return nil, err
	}
	// GoogleUserポインタの場所を戻り値に渡す
	return &GoogleUser{
		id:    id,
		name:  name,
		email: mail,
	}, nil
}

// 相変わらずよくわかんない
func (u *GoogleUser) Id() string {
	return u.id
}

func (u *GoogleUser) Name() string {
	return u.name
}

func (u *GoogleUser) Email() Email {
	return u.email
}
