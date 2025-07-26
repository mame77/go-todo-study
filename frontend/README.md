# Modern Todo Frontend

モダンなデザインのTodoアプリケーションのフロントエンド部分です。GitHub・Google・デモアカウントでのOAuth認証を含みます。

## 🚀 特徴

- **モダンなUI/UX**: TailwindCSSとガラスモーフィズム効果
- **OAuth認証**: GitHub、Google、デモアカウント対応
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **アニメーション**: スムーズなトランジションとアニメーション
- **ローカルストレージ**: データの永続化
- **フィルター機能**: すべて・未完了・完了済みの切り替え
- **リアルタイム統計**: タスクの進捗表示

## 📁 プロジェクト構造

```
frontend/
├── index.html                  # エントリーポイント（リダイレクト用）
├── package.json               # プロジェクト設定
├── README.md                  # このファイル
├── pages/                     # HTMLページ
│   ├── login.html            # ログイン画面
│   └── index.html            # メインのTodoアプリ
├── src/                      # ソースコード
│   ├── scripts/              # JavaScript
│   │   ├── auth.js          # 認証管理
│   │   ├── todo.js          # Todo機能
│   │   └── utils.js         # ユーティリティ関数
│   └── styles/              # CSS
│       └── shared.css       # 共通スタイル
└── assets/                  # 静的アセット
    ├── images/              # 画像ファイル
    └── icons/               # アイコンファイル
```

## 🛠️ セットアップ

### 必要条件

- Node.js 16.0.0以上
- モダンブラウザ（Chrome、Firefox、Safari、Edge）

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 開発サーバー

```bash
# ローカルサーバーを起動（http://localhost:3000）
npm start

# または
npm run serve
```

## 🔐 OAuth設定

本格的なOAuth認証を使用する場合は、以下の設定が必要です：

### GitHub OAuth

1. GitHub Developer Settingsで新しいOAuth Appを作成
2. `src/scripts/auth.js`の`clientId`を更新
3. Authorization callback URLを設定: `http://localhost:3000/frontend/pages/`

### Google OAuth

1. Google Cloud Consoleで新しいプロジェクトを作成
2. OAuth 2.0 credentialsを設定
3. `src/scripts/auth.js`の`clientId`を更新
4. Authorized redirect URIsを設定: `http://localhost:3000/frontend/pages/`

## 🎨 カスタマイズ

### スタイル

- `src/styles/shared.css`: 共通スタイルとアニメーション
- TailwindCSSクラスで大部分のスタイリング
- カスタムCSSプロパティでテーマ調整可能

### 機能追加

- `src/scripts/todo.js`: Todo機能の拡張
- `src/scripts/auth.js`: 認証機能の拡張
- `src/scripts/utils.js`: ユーティリティ関数の追加

## 🚀 デプロイ

### 静的ファイルホスティング

```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm install -g netlify-cli
netlify deploy --prod --dir .

# GitHub Pages
# リポジトリ設定でPagesを有効化
```

### 環境変数

本番環境では以下の設定を行ってください：

- OAuth Client IDを本番用に更新
- Redirect URIsを本番URLに設定
- HTTPSを有効化

## 📱 ブラウザサポート

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔧 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox、Grid、アニメーション
- **TailwindCSS**: ユーティリティファーストCSS
- **Vanilla JavaScript**: ES6+構文
- **Font Awesome**: アイコン
- **LocalStorage**: データ永続化

## 🎯 主要機能

### 認証
- GitHub OAuth 2.0
- Google OAuth 2.0  
- デモアカウント（開発用）
- セッション管理
- 自動ログアウト

### Todo管理
- タスクの追加・削除・完了
- フィルタリング（全て・未完了・完了済み）
- リアルタイム統計
- ローカルストレージ永続化
- ユーザー別データ分離

### UI/UX
- ガラスモーフィズム効果
- スムーズアニメーション
- レスポンシブデザイン
- ダークテーマ対応
- アクセシビリティ配慮

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 ライセンス

このプロジェクトはMITライセンスのもとで公開されています。

## 🔗 関連リンク

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [GitHub OAuth Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)