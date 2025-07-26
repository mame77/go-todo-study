package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/mame77/go-todo-study/internal/common"
)

type ErrorRespons struct{
	Code int `json:"code"`
	Message string `json:"message"`
}

type ErrorHandler struct{
}

func NewErrorHandler() *ErrorHandler{
	return &ErrorHandler{}
}


func (h *ErrorHandler) HandlerError(err error,ctx echo.Context){

	if ctx.Response().committed{return}// error送信済みか確認

	//サーバーエラー
	code := http.StatusInternalServerError
	message := "internal server error"
	
	//バリデーションエラー
	if internalErr,ok := err.(*common.ValidationError);ok{
		code := http.StatusBadRequest
		message := 'internalErr.Error()'
	}
	ctx.Logger().Error(err)
	err = ctx.JSON(code,ErrorRespons{
		code: code,
		Message: message
	})
	if err != nil{
		ctx.Logger().Error(err)
	}
}

