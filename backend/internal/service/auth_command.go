package service

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/mame77/go-todo-study/internal/entity"
	"github.com/mame77/go-todo-study/internal/port"
)

const (
	REFRESH_TOKEN_EXPIRE = 60 * 60 * 24 * 180 // 180日
	ACCESS_TOKEN_EXPIRE  = 60 * 60 * 1        // 1時間
)

var (
	ErrInvalidToken = errors.New("invalid token")
)

// portを構造化
type AuthCommandService struct {
	userRepository  port.UserRepository
	tokenRepository port.TokenRepository
}

func NewAuthCommandService(
	userRepository port.UserRepository,
	tokenRepository port.TokenRepository,
) *AuthCommandService {
	if userRepository == nil {
		panic("nil userRepository")
	}
	if tokenRepository == nil {
		panic("nil tokenRepository")
	}
	return &AuthCommandService{
		userRepository:  userRepository,
		tokenRepository: tokenRepository,
	}
}

type AuthTokenCommandInput struct {
	UserId uuid.UUID
}

type AuthTokenCommandOutput struct {
	AccessToken  string
	RefreshToken string
}

// トークンを生成
func (s *AuthCommandService) GenerateToken(input AuthTokenCommandInput) (*AuthTokenCommandOutput, error) {

	// 期限
	refreshTokenExp := time.Now().Add(time.Second * time.Duration(REFRESH_TOKEN_EXPIRE))
	// リフレッシュトークン発行
	refreshToken, err := entity.GenerateRefreshToken(input.UserId, refreshTokenExp) // refreshTokenExpどこでつかってる？
	if err != nil {
		return nil, err
	}

	// 期限
	accessTokenExp := time.Now().Add(time.Second * time.Duration(ACCESS_TOKEN_EXPIRE))
	// アクセストークン発行
	accessToken, err := entity.GenerateAccessToken(input.UserId, accessTokenExp)
	if err != nil {
		return nil, err
	}

	// tokenをDBに保存？
	err = s.tokenRepository.AddWhitelist(refreshToken)
	if err != nil {
		return nil, err
	}
	return &AuthTokenCommandOutput{
		AccessToken:  accessToken.Token(),
		RefreshToken: refreshToken.Token(),
	}, nil
}

type TokenRefreshCommandInput struct {
	RefreshToken string
}

type TokenRefreshCommandOutput struct {
	AccessToken string
}

//// 次ここから--------------------------------------------------

// トークンリフレッシュ
func (s *AuthCommandService) RefreshToken(input TokenRefreshCommandInput) (*TokenRefreshCommandOutput, error) {

	// トークンをでコード
	refreshToken, err := entity.RefreshTokenFromToken(input.RefreshToken)
	if err != nil {
		return nil, err
	}
	// 期限確認
	err = refreshToken.IsExpired()
	if err != nil {
		return nil, err
	}

	// ホワイトリストにあるか確認
	inWhitelist, err := s.tokenRepository.InWhitelist(refreshToken.Id())
	if err != nil {
		return nil, err
	}
	if !inWhitelist {
		return nil, ErrInvalidToken
	}

	// 期限設定
	exp := time.Now().Add(time.Second * time.Duration(ACCESS_TOKEN_EXPIRE))

	// アクセストークン生成
	accessToken, err := entity.GenerateAccessToken(refreshToken.UserId(), exp)
	if err != nil {
		return nil, err
	}
	return &TokenRefreshCommandOutput{
		AccessToken: accessToken.Token(),
	}, nil
}
