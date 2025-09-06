package datasource

import (
	"os"

	"github.com/redis/go-redis/v9"
)

// Redis接続
func NewRedisClient() *redis.Client {
	addr := getRedisAddr()
	password := getRedisPassword()
	db := getRedisDB()
	
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       db,
	})
	
	return client
}

func getRedisAddr() string {
	addr, ok := os.LookupEnv("REDIS_ADDR")
	if !ok {
		return "localhost:6379" // デフォルト値
	}
	return addr
}

func getRedisPassword() string {
	password, _ := os.LookupEnv("REDIS_PASSWORD")
	return password // 空文字列でも問題ない
}

func getRedisDB() int {
	db, ok := os.LookupEnv("REDIS_DB")
	if !ok {
		return 0 // デフォルト値
	}
	// 簡易的な変換
	if db == "1" {
		return 1
	}
	return 0
}