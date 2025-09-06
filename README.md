# Todoアプリケーション

このプロジェクトは、Todoリストアプリケーションを開発することで、Go、React、およびSQLに関する実践的な知識を習得し、ウェブアプリケーション開発の知識をアウトプットすることを目的としています。

## プロジェクトの目的

- **Go言語の学習**: バックエンドAPIの開発を通じてGo言語の基礎から実践までを学ぶ。

- **Reactの学習**: モダンなフロントエンドフレームワークであるReactを用いて、インタラクティブなUIを構築。

- **SQLの学習**: データベース設計と操作を通じてSQLの知識を深める。

- **ウェブアプリケーションをフルスタックで開発**: フロントエンドとバックエンドの連携、認証フロー、データベース操作など、ウェブアプリケーション開発に必要な一連の知識を実践的に適用し、理解を深める。

## 使用技術

### バックエンド (Go)

- **言語**: Go

- **フレームワーク**: [Echo v4](https://echo.labstack.com/)

- **データベース**: MySQL

- **データベースマイグレーション**: [golang-migrate](https://github.com/golang-migrate/migrate)

- **環境変数管理**: [godotenv](https://github.com/joho/godotenv)

- **認証**: Google OAuth 2.0 (予定)

### フロントエンド (React)

- **フレームワーク**: React (詳細なライブラリは開発中に決定)

### インフラ

- **コンテナ化**: Docker / Docker Compose (MySQLデータベースの管理に利用)

## アーキテクチャ

### フロントエンド (React): Feature Slice Architecture

このプロジェクトのReactフロントエンドでは、**Feature Slice Architecture**を採用します。

**Feature Slice Architecture を選択した理由:**

- **学習と実践**: モダンなReactアプリケーションの構造を学ぶ上で、実践的かつ「それっぽい」アーキテクチャに触れる良い機会だと考えました。

- **関心の分離**: 各機能が独立した「スライス」として扱われるため、特定の機能に関連するすべてのファイル（UI、ロジック、状態）が一箇所にまとめられる。

### バックエンド (Go): 友人のディレクトリ構成を模倣

Goバックエンドのアーキテクチャについては、今回の開発がGoでのウェブアプリケーション開発の初期段階であるため、複雑な独自のアーキテクチャ設計に時間をかけるよりも、**友人の既存のディレクトリ構成を模倣する**ことを選択しました。

友人の構成（`common`, `datasource`, `entity`, `event`, `handler`, `port`, `repository`, `service` など）は、一般的にクリーンアーキテクチャやレイヤードアーキテクチャの原則に沿ったものであり、各層の役割が明確に分離されています。これにより、Go言語のコード構造と責務の分離について実践的に学ぶことができます。

## セットアップ方法

### 前提条件

- Go (バージョン 1.20以上を推奨)

- Docker および Docker Compose

- Node.js および npm (Reactフロントエンド用)

### プロジェクトのクローン

```
git clone https://github.com/mame77/go-todo-study.git
cd go-todo-study/backend
```

### バックエンドのセットアップ

1. **Goモジュールのダウンロード**:

   ```
   go mod tidy
   ```

2. **`.env` ファイルの作成**: プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の内容を記述してください。

   ```
   # MySQLデータベース接続情報 (Docker Composeと同期)
   MYSQL_USER=myuser
   MYSQL_PASSWORD=pword
   MYSQL_DATABASE=Todo
   TODO_HTTP_PORT=7777 # Goアプリケーションがリッスンするポート

   # Google OAuth クライアント情報 (Google Cloud Consoleで取得)
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   GOOGLE_REDIRECT_URI=http://localhost:7777/api/auth/google/callback # あなたのバックエンドのコールバックURL
   ```

   **注意**: `YOUR_GOOGLE_CLIENT_ID` と `YOUR_GOOGLE_CLIENT_SECRET` は、Google Cloud Consoleで取得した実際の値に置き換えてください。

3. **Docker Composeでデータベースを起動**: `backend` ディレクトリで以下のコマンドを実行します。

   ```
   docker-compose up -d
   ```

   これにより、MySQLコンテナがバックグラウンドで起動します。

4. **データベースマイグレーションの実行**: `golang-migrate` ツールをインストールしていることを確認し、マイグレーションを適用します。

   ```
   # golang-migrateツールがPATHに含まれていない場合
   # go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
   # export PATH=$PATH:$(go env GOPATH)/bin # PATHに追加 (一度だけ実行)

   migrate -path migrations -database "mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@tcp(localhost:${TODO_HTTP_PORT})/Todo?parseTime=true" up
   ```

   **注意**: 上記の`MYSQL_USER`や`MYSQL_PASSWORD`などは、`.env`ファイルに設定した値に合わせてください。また、`TODO_HTTP_PORT`はDocker Composeの`ports`設定と一致させてください。

### フロントエンドのセットアップ (準備中)

Reactフロントエンドは現在開発中ですが、基本的なセットアップは以下のようになる予定です。

1. `frontend` ディレクトリに移動:

   ```
   cd ../frontend # バックエンドディレクトリから移動する場合
   ```

2. 依存関係のインストール:

   ```
   npm install
   ```

## 実行方法

### バックエンドの実行

`backend` ディレクトリで以下のコマンドを実行します。

```
go run ./cmd/api/
```

サーバーが起動し、`http://localhost:7777` でアクセスできるようになります。

### フロントエンドの実行 (準備中)

`frontend` ディレクトリで以下のコマンドを実行します。

```
npm start
```

これにより、開発サーバーが起動し、ブラウザでアプリケーションにアクセスできるようになります。
