package mysql

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/mame77/go-todo-study/internal/common"
	"github.com/mame77/go-todo-study/internal/entity"
	"github.com/mame77/go-todo-study/internal/port"
)

//// 初期設定----------------------------------------

type MySqlUserRepository struct {
	db *sqlx.DB
}

func NewMySqlUserRepository(db *sqlx.DB) port.UserRepository {
	if db == nil {
		panic("nil MySQL DB")
	}
	return &MySqlUserRepository{
		db: db,
	}
}

type UserAndGoogleIdModel struct {
	Id        []byte    `db:"id"`
	Name      string    `db:"name"`
	Email     string    `db:"email"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	GoogleId  string    `db:"google_id"`
}

type UserAndGithubIdModel struct {
	Id        []byte    `db:"id"`
	Name      string    `db:"name"`
	Email     string    `db:"email"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	GithubId  string    `db:"github_id"`
}

// ユーザーを新規作成する
func (r *MySqlUserRepository) Create(user *entity.User) error {
	return RunInTx(r.db, func(tx *sqlx.Tx) error {
		sql := `
		INSERT INTO users(id,name,email,created_at,updated_at)
		VALUES(:id,:name,:email,:created_at,:updated_at)
		`

		userId := user.Id()
		_, err := tx.NamedExec(sql, map[string]any{
			"id":         userId[:],
			"name":       user.Name(),
			"email":      user.Email(),
			"created_at": user.CreatedAt(),
			"updated_at": user.UpdatedAt(),
		})
		if err != nil {
			return err
		}
		sql = `
		INSERT INTO google_ids(id,user_id)
		VALUES(:googleId,:userId)
		`
		_, err = tx.NamedExec(sql, map[string]any{
			"id":     user.GoogleId(),
			"userId": userId[:],
		})
		if err != nil {
			return err
		}
		sql = `
		INSERT INTO github_ids(id,user_id)
		VALUES(:githubID,:userId)
		`
		_, err = tx.NamedExec(sql, map[string]any{
			"id":     user.GithubId(),
			"userId": userId[:],
		})
		return err
	})
}

// userIdから検索する
func (r *MySqlUserRepository) FindById(id uuid.UUID) (*entity.User, error) {
	sql := `
	SELECT
			users.id,users.name,users.email,users.created_at,users.updated_at,google_ids.id
	FROM users
			JOIN google_ids
			ON users.id = google_ids.user_id
	WHERE
	users.id = :id
	`
	model := UserAndGoogleIdModel{}
	row, err := r.db.NamedQuery(sql, map[string]any{
		"id": id[:],
	})
	if err != nil {
		return nil, err
	}
	//ユーザーが帰ってきたか確認
	if !row.Next() {
		return nil, common.NewNotFoundError(fmt.Errorf("user id %s not found", id.String()))
	}
	//モデルにバインド
	if err != nil {
		fmt.Printf("columns err: %s\n", err.Error())
	} else {
		fmt.Println("columns")
	}
	err = row.StructScan(&model)
	if err != nil {
		return nil, err
	}
	//モデルをユーザーに交換
	return userAndGoogleIdModelToUser(&model)
}

//// Google------------------------------------------

// GoogleIdからユーザーを検索する
func (r *MySqlUserRepository) FindByGoogleId(googleId string) (*entity.User, error) {
	sql := `
	SELECT
		users.id,users.name,users.email,users.created_at,users.updated_at,google_ids.id
	FROM users
		JOIN google_ids
		ON users.id = google_ids.user_id
	WHERE
		google_ids.id = :googleId
	`
	model := UserAndGoogleIdModel{}

	row, err := r.db.NamedQuery(sql, map[string]any{
		"googleId": googleId,
	})
	if err != nil {
		return nil, err
	}
	if !row.Next() {
		return nil, common.NewNotFoundError(fmt.Errorf("user with google id %s not found", googleId))
	}
	err = row.StructScan(&model)
	if err != nil {
		return nil, err
	}
	//ユーザーが帰ってきたか確認
	return userAndGoogleIdModelToUser(&model)
}

// UserAndGoogleIdDBModelをUserに変換する
func userAndGoogleIdModelToUser(model *UserAndGoogleIdModel) (*entity.User, error) {
	id, err := uuid.FromBytes(model.Id)
	if err != nil {
		return nil, err
	}
	email, err := entity.NewEmail(model.Email)
	if err != nil {
		return nil, err
	}
	return entity.NewUser(
		id,
		model.Name,
		email,
		model.GoogleId,
		"", // GithubIdは空文字列
		model.CreatedAt,
		model.UpdatedAt,
	)
}

//// Github-----------------------------------------

// GithubIdからユーザーを検索する
func (r *MySqlUserRepository) FindByGithubId(githubId string) (*entity.User, error) {
	sql := `
	SELECT
		users.id,users.name,users.email,users.created_at,users.updated_at,github_ids.id
	FROM users
		JOIN github_ids
		ON users.id = github_ids.user_id
	WHERE
		github_ids.id = :githubId
	`
	// 修正: 適切な構造体UserAndGithubIdModelを使用
	model := UserAndGithubIdModel{}

	// 修正: rowを使用してデータを取得する必要がある
	row, err := r.db.NamedQuery(sql, map[string]any{
		"githubId": githubId,
	})
	if err != nil {
		return nil, err
	}
	if !row.Next() {
		return nil, common.NewNotFoundError(fmt.Errorf("user with github id %s not found", githubId))
	}
	err = row.StructScan(&model)
	if err != nil {
		return nil, err
	}
	//ユーザーが帰ってきたか確認
	return userAndGithubIdModelToUser(&model)
}

// UserAndGithubIdDBModelをUserに変換する
func userAndGithubIdModelToUser(model *UserAndGithubIdModel) (*entity.User, error) {
	// 修正: 適切にUserAndGithubIdModelを使用
	id, err := uuid.FromBytes(model.Id)
	if err != nil {
		return nil, err
	}
	email, err := entity.NewEmail(model.Email)
	if err != nil {
		return nil, err
	}
	return entity.NewUser(
		id,
		model.Name,
		email,
		"", // GoogleIdは空文字列
		model.GithubId,
		model.CreatedAt,
		model.UpdatedAt,
	)
}
