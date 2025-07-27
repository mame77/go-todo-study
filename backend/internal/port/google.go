package port

// googleの認証関連

import "github.com/mame77/go-todo-study/internal/entity"

type GoogleRepository interface {

	// 認証コードを使いaccsesstokenでユーザー情報を取得
	CodeAuthorization(code string) (*entity.GoogleUser, error)
}
