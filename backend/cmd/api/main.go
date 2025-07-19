package main

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	//.env
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	//port
	port := os.Getenv("TODO_HTTP_PORT")

	e := echo.New()
	e.Use(middleware.Logger())
	e.Logger.Fatal(e.Start(":" + port))

	//apiのやつやけど正味よくわからん
	//	api := e.Group("/api")

	//handlerめっちゃまとめてるやつ
	//	handlerSets := InitHandlerSets()

}
