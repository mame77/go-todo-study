package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/mame77/go-todo-study/internal/datasource"
	"github.com/mame77/go-todo-study/internal/entity"
	"github.com/mame77/go-todo-study/internal/port"
)

const (
	GITHUB_OAUTH_TOKEN_URL = "https://github.com/login/oauth/access_token"
	GITHUB_USER_API_URL    = "https://api.github.com/user"
)

// GitHub API リポジトリ構造体
type ApiGithubRepository struct {
	client *datasource.GithubApiClient
}

// GithubApiRepository のコンストラクタ
func NewApiGithubRepository(client *datasource.GithubApiClient) port.GithubRepository {
	if client == nil {
		panic("nil GithubApiClient")
	}
	return &ApiGithubRepository{
		client: client,
	}
}

// GitHub OAuth API のレスポンス構造体
type GithubOauthResponse struct {
	AccessToken string `json:"access_token"`
	Scope       string `json:"scope"`
	TokenType   string `json:"token_type"`
}

// GitHub ユーザー情報 API のレスポンス構造体
type GithubUserResponse struct {
	Id        int    `json:"id"`
	Login     string `json:"login"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	AvatarUrl string `json:"avatar_url"`
}

// Oauthのコードの認証を行う、ユーザーの情報を取得する
func (r *ApiGithubRepository) CodeAuthorization(code string) (*entity.GithubUser, error) {
	//リクエスト作成
	req, err := r.createOauthRequest(code)
	if err != nil {
		return nil, err
	}
	//クライアント用意
	client := &http.Client{}

	//Oauthリクエスト送信
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("oauth request failed")
	}

	//bodyを読む
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	//json変換
	oauthResponse := GithubOauthResponse{}
	err = json.Unmarshal(body, &oauthResponse)
	if err != nil {
		return nil, err
	}
	fmt.Println("oauth response unmarshal")

	//ユーザー情報取得リクエスト作成
	req, err = r.createUserRequest(oauthResponse.AccessToken)
	if err != nil {
		return nil, err
	}
	//ユーザー情報取得リクエスト送信
	resp, err = client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("user infomation request failed")
	}
	//bodyを読む
	body, err = io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	//json変換
	userResponse := GithubUserResponse{}
	err = json.Unmarshal(body, &userResponse)
	if err != nil {
		return nil, err
	}
	//githubユーザー作成
	githubUser, err := entity.NewGithubUser(fmt.Sprintf("%d", userResponse.Id), userResponse.Name, userResponse.Email, userResponse.AvatarUrl)
	if err != nil {
		return nil, err
	}
	return githubUser, nil
}

// ユーザー情報を取得するリクエスト作成
func (r *ApiGithubRepository) createUserRequest(accessToken string) (*http.Request, error) {
	req, err := http.NewRequest(
		"GET",
		GITHUB_USER_API_URL,
		nil,
	)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Authorization", "token "+accessToken)
	req.Header.Add("Accept", "application/vnd.github.v3+json")
	return req, nil
}

// accesstoken取得目的
func (r *ApiGithubRepository) createOauthRequest(code string) (*http.Request, error) {
	//フォームデータ
	values := url.Values{}
	values.Set("code", code)
	values.Set("client_id", r.client.ClientId())
	values.Set("client_secret", r.client.ClientSecret())
	values.Set("redirect_uri", r.client.RedirectURI())
	values.Set("grant_type", "authorization_code")

	//リクエスト
	req, err := http.NewRequest(
		"POST",
		GITHUB_OAUTH_TOKEN_URL,
		// フォームデータをエンコード
		strings.NewReader(values.Encode()),
	)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")
	return req, nil
}
