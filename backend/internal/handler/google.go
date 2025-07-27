package handler

//// google Oauthリダイレクト

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mame77/go-todo-study/internal/common"
	"github.com/mame77/go-todo-study/internal/service"
)

//// 初期設定----------------------------------------

type GoogleHandler struct {
	googleCmdService *service.GoogleCommandService
}

func NewGoogleHandler(googleCmdService *service.GoogleCommandService) *GoogleHandler {
	if googleCmdService == nil {
		panic("nil GoogleCmdService")
	}
	return &GoogleHandler{
		googleCmdService,
	}
}

type GoogleLoginResponse struct {
	Id           string `json:"id"`
	Name         string `json:"name"`
	Email        string `json:"email"`
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

//// httpをリクエストを受け取ってレスポンスを返す----------------------

func (h *GoogleHandler) Redirect(ctx echo.Context) error {
	if !ctx.QueryParams().Has("code") {
		return common.NewValidationError(errors.New("code is not set"))
	}
	output, err := h.googleCmdService.OauthLogin(service.GoogleOauthLoginCommandInput{
		Code: ctx.QueryParam("code"),
	})
	if err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, GoogleLoginResponse{
		Id:           output.Id.String(),
		Name:         output.Name,
		Email:        output.Email,
		AccessToken:  output.AccessToken,
		RefreshToken: output.RefreshToken,
	})
}
