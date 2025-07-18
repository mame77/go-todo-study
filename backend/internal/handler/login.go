package handler

// 構造体
type GoogleHandler struct {
}

func NewGoogleHandler() *GoogleHandler {
	return &GoogleHandler{}
}

func (h *GoogleHandler) Redirect(ctx echo.context) error {
	return nil
}

func (h *GoogleHandler) Code(ctx echo.context) error {
	return nil
}
