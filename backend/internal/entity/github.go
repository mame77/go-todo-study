package entity

import "errors"

var (
	ErrGithubUserIdRequired   = errors.New("GithubUser 'id' is required")
	ErrGithubUserNameRequired = errors.New("GithubUser 'name' is required")
)

type GithubUser struct {
	id      string
	name    string
	email   Email
	picture string
}

func NewGithubUser(id, name, email, picture string) (*GithubUser, error) {
	if id == "" {
		return nil, ErrGithubUserIdRequired
	}
	if name == "" {
		return nil, ErrGithubUserNameRequired
	}
	mail, err := NewEmail(email)
	if err != nil {
		return nil, err
	}
	// GithubUserポインタの場所を戻り値に渡す
	return &GithubUser{
		id:      id,
		name:    name,
		email:   mail,
		picture: picture,
	}, nil
}

func (u *GithubUser) Id() string {
	return u.id
}

func (u *GithubUser) Name() string {
	return u.name
}

func (u *GithubUser) Email() Email {
	return u.email
}

func (u *GithubUser) Picture() string {
	return u.picture
}
