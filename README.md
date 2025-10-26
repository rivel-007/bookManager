# プロジェクトに関して
　cursorを用いたアプリ作成練習の一環

# 📚 書籍管理アプリケーション セットアップガイド
## 必要な環境

- Java 25以上
- PostgreSQL 12以上
- Node.js 18以上
- Maven（またはMaven Wrapper）

## セットアップ手順

### 1. PostgreSQLデータベースの作成

#### 方法A: コマンドラインから作成
```bash
# PostgreSQLの環境変数が設定されている場合
psql -U postgres -c "CREATE DATABASE bookmanager;"

# または、インタラクティブに接続
psql -U postgres
# psqlプロンプトで実行
CREATE DATABASE bookmanager;
\q
```

#### 方法B: pgAdminを使用
1. pgAdminを起動
2. PostgreSQLサーバーに接続
3. データベースを右クリック → Create → Database
4. データベース名: `bookmanager`
5. Save をクリック

#### 方法C: 設定ファイルを確認して手動で作成
現在の設定ファイル (`backend/src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bookmanager
spring.datasource.username=postgres
spring.datasource.password=password
```

実際のPostgreSQLのユーザー名とパスワードに合わせて設定を変更してください。

### 2. バックエンドの起動

#### 開発環境での起動
```bash
cd backend

# Mavenでアプリケーションを起動
./mvnw spring-boot:run

# または、Maven Wrapperが使えない場合
mvn spring-boot:run
```

#### 補足: インストール済みMavenの場合
```bash
# プロジェクトのルートディレクトリで
cd backend
mvn clean install
mvn spring-boot:run
```

バックエンドは `http://localhost:8080` で起動します。

### 3. フロントエンドの起動

#### 新しいターミナルウィンドウで実行
```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係をインストール（初回のみ）
npm install

# 開発サーバーを起動
npm run dev
```

#### 必要な依存関係
```bash
# Tailwind CSSとその依存関係をインストール
npm install -D tailwindcss postcss autoprefixer
npm install axios lucide-react
```

フロントエンドは `http://localhost:5173` で起動します。

### 4. アプリケーションの確認

1. ブラウザで `http://localhost:5173` を開く
2. 「新しい書籍を追加」ボタンをクリック
3. 書籍情報を入力して保存
4. 検索・フィルター機能を試す
5. 並び替え機能を試す

## 動作確認

### バックエンドAPI テスト

```bash
# 全書籍取得
curl http://localhost:8080/api/books

# 書籍作成
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "テスト書籍",
    "author": "テスト著者",
    "category": "技術書",
    "status": "UNREAD",
    "memo": "テストメモ"
  }'

# 書籍検索
curl "http://localhost:8080/api/books/search?title=テスト"
```

## トラブルシューティング

### PostgreSQLの接続エラー
- PostgreSQLが起動しているか確認
- ユーザー名とパスワードが正しいか確認
- `application.properties`の設定を確認

### ポートが既に使用中
- バックエンド: `application.properties`の`server.port`を変更
- フロントエンド: `vite.config.ts`でポートを変更

### 文字コードの問題
- PowerShellで`chcp 65001`を実行してUTF-8に設定

## 本番環境へのデプロイ

### バックエンド
```bash
cd backend
./mvnw clean package
java -jar target/bookmanager-0.0.1-SNAPSHOT.jar
```

### フロントエンド
```bash
cd frontend
npm run build
```
