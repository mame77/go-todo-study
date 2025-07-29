package service

import (
	"github.com/google/uuid"
	"github.com/mame77/go-todo-study/internal/port"
)

//// 初期設定-----------------------------------------------------

// 構造体
type GoogleCommandService struct {
	userCmdService   *UserCommandService
	authCmdService   *AuthCommandService
	userRepository   port.UserRepository
	googleRepository port.GoogleRepository
}

// portやサービスが使えるか検証
func NewGoogleCommandService(
	userCmdService *UserCommandService,
	authCmdService *AuthCommandService,
	userRepository port.UserRepository,
	googleRepository port.GoogleRepository,
) *GoogleCommandService {
	if userCmdService == nil {
		panic("nil UserCommandService")
	}
	if authCmdService == nil {
		panic("nil AuthCommandService")
	}
	if userRepository == nil {
		panic("nil UserRepository")
	}
	if googleRepository == nil {
		panic("nil GoogleRepository")
	}
	return &GoogleCommandService{
		userCmdService:   userCmdService,
		authCmdService:   authCmdService,
		userRepository:   userRepository,
		googleRepository: googleRepository,
	}
}

// インプット
type GoogleOauthLoginCommandInput struct {
	Code string
}

// アウトプット
type GoogleOauthLoginCommandOutput struct {
	Id           uuid.UUID
	Name         string
	Email        string
	AccessToken  string
	RefreshToken string
}

func (s *GoogleCommandService) OauthLogin(input GoogleOauthLoginCommandInput) (*GoogleOauthLoginCommandOutput, error) {
	//googleサーバーから情報取得
	googleUser, err := s.googleRepository.CodeAuthorization(input.Code)
	if err != nil {
		return nil, err
	}
	//GoogleIdで検索,DBから情報取得
	user, err := s.userRepository.FindByGoogleId(googleUser.Id())
	if err != nil {

		//// userが存在しない場合--------------------------------------

		// userを作成
		userOutput, err := s.userCmdService.CreateUser(UserCreateCommandInput{
			Name:     googleUser.Name(),
			Email:    googleUser.Email().String(),
			GoogleId: googleUser.Id(),
		})
		if err != nil {
			return nil, err
		}
		// トークン作成
		tokenOutput, err := s.authCmdService.GenerateToken(AuthTokenCommandInput{
			UserId: userOutput.Id,
		})
		if err != nil {
			return nil, err
		}
		// 出力まとめ
		return &GoogleOauthLoginCommandOutput{
			Id:           userOutput.Id,
			Name:         userOutput.Name,
			Email:        userOutput.Email,
			AccessToken:  tokenOutput.AccessToken,
			RefreshToken: tokenOutput.RefreshToken,
		}, nil
	} else {

		//// userが存在する場合-----------------------------------------

		// トークン作成
		tokenOutput, err := s.authCmdService.GenerateToken(AuthTokenCommandInput{
			UserId: user.Id(),
		})
		if err != nil {
			return nil, err
		}
		// 出力まとめ
		return &GoogleOauthLoginCommandOutput{
			Id:           user.Id(),
			Name:         user.Name(),
			Email:        user.Email().String(),
			AccessToken:  tokenOutput.AccessToken,
			RefreshToken: tokenOutput.RefreshToken,
		}, nil
	}
}
