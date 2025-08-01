package main

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// .env読み込み
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	// Wireで依存注入されたアプリを初期化
	app, err := InitializeApp()
	if err != nil {
		panic("Failed to initialize app: " + err.Error())
	}

	// ミドルウェア設定
	app.Echo.Use(middleware.Logger())

	// ルート設定
	api := app.Echo.Group("/api")
	api.GET("/google/redirect", app.GoogleHandler.Redirect)

	// サーバー起動
	port := os.Getenv("TODO_HTTP_PORT")
	if port == "" {
		port = "8080"
	}
	
	app.Echo.Logger.Fatal(app.Echo.Start(":" + port))
}
