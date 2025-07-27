package datasource

// DBの初期設定

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	migrate "github.com/rubenv/sql-migrate"
)

// MySQL接続
func GetMySqlConnection() *sqlx.DB {
	db, err := sqlx.Connect("mysql", getMySqlDSN())
	if err != nil {
		panic("faild to connect MySQL database:" + err.Error())
	}
	mysqlMigration(db)
	return db
}

// MySQLのDSNを環境変数で作成する
func getMySQLDSN() string {
	host := mustEnv("MYSQL_HOST")
	user := mustEnv("MYSQL_USER")
	password := mustEnv("MYSQL_PASSWORD")
	database := mustEnv("MYSQL_DATABASE")
	// DSN
	return fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", user, password, host, database)
}

// 環境変数が読み込まれない場合はpanic
func mustEnv(envName string) string {
	env, ok := os.LookupEnv(envName)
	if !ok {
		panic(fmt.Sprintf("\"%s\"is no set", envName))
	}
	return env
}
