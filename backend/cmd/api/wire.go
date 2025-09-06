//go:build wireinject
// +build wireinject

package main

import (
	"github.com/google/wire"
	"github.com/labstack/echo/v4"
	"github.com/mame77/go-todo-study/internal/datasource"
	"github.com/mame77/go-todo-study/internal/handler"
	"github.com/mame77/go-todo-study/internal/repository/api"
	"github.com/mame77/go-todo-study/internal/repository/mysql"
	"github.com/mame77/go-todo-study/internal/repository/redis"
	"github.com/mame77/go-todo-study/internal/service"
)

func InitializeApp() (*App, error) {
	wire.Build(
		// Datasource providers
		datasource.GetMySQLConnection,
		datasource.NewRedisClient,
		datasource.NewGoogleApiClient,
		
		// Repository providers
		mysql.NewMySqlUserRepository,
		redis.NewRedisTokenRepository,
		api.NewApiGoogleRepository,
		
		// Service providers
		service.NewUserCommandService,
		service.NewAuthCommandService,
		service.NewGoogleCommandService,
		
		// Handler providers
		handler.NewGoogleHandler,
		
		// App provider
		NewApp,
	)
	return &App{}, nil
}

type App struct {
	Echo          *echo.Echo
	GoogleHandler *handler.GoogleHandler
}

func NewApp(googleHandler *handler.GoogleHandler) *App {
	e := echo.New()
	return &App{
		Echo:          e,
		GoogleHandler: googleHandler,
	}
}
