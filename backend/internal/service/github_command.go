package service

import (
	"github.com/google/uuid"
	"github.com/mame77/go-todo-study/internal/port"
)

//// 初期設定-----------------------------------------------------

// 構造体
type GithubCommandService struct {
	userCmdService   *UserCommandService
	authCmdService   *AuthCommandService
	userRepository   port.UserRepository
	githubRepository port.GithubRepository
}

// portやサービスが使えるか検証
func NewGithubCommandService(
	userCmdService *UserCommandService,
	authCmdService *AuthCommandService,
	userRepository port.UserRepository,
	githubRepository port.GithubRepository,
) *GithubCommandService {
	if userCmdService == nil {
		panic("nil UserCommandService")
	}
	if authCmdService == nil {
		panic("nil AuthCommandService")
	}
	if userRepository == nil {
		panic("nil UserRepository")
	}
	if githubRepository == nil {
		panic("nil GoogleRepository")
	}
	return &GithubCommandService{
		userCmdService:   userCmdService,
		authCmdService:   authCmdService,
		userRepository:   userRepository,
		githubRepository: githubRepository,
	}
}

// インプット
type GithubOauthLoginCommandInput struct {
	Code string
}

// アウトプット
type GithubOauthLoginCommandOutput struct {
	Id           uuid.UUID
	Name         string
	Email        string
	AccessToken  string
	RefreshToken string
}

func (s *GithubCommandService) OauthLogin(input GithubOauthLoginCommandInput) (*GithubOauthLoginCommandOutput, error) {
	//Githubサーバーから情報取得
	githubUser, err := s.githubRepository.CodeAuthorization(input.Code)
	if err != nil {
		return nil, err
	}
	//GithubIdで検索,DBから情報取得
	user, err := s.userRepository.FindByGithubId(githubUser.Id())
	if err != nil {

		//// userが存在しない場合--------------------------------------

		// userを作成
		userOutput, err := s.userCmdService.CreateUser(UserCreateCommandInput{
			Name:     githubUser.Name(),
			Email:    githubUser.Email().String(),
			GithubId: githubUser.Id(),
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
		return &GithubOauthLoginCommandOutput{
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
		return &GithubOauthLoginCommandOutput{
			Id:           user.Id(),
			Name:         user.Name(),
			Email:        user.Email().String(),
			AccessToken:  tokenOutput.AccessToken,
			RefreshToken: tokenOutput.RefreshToken,
		}, nil
	}
}
