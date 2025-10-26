-- 書籍管理アプリケーション データベースセットアップ
-- このファイルをPostgreSQLで実行してください

-- データベースを作成（既に存在する場合はスキップ）
CREATE DATABASE bookmanager;

-- データベースに接続
\c bookmanager

-- 接続情報
-- ホスト: localhost
-- ポート: 5432
-- データベース名: bookmanager
-- ユーザー名: postgres
-- パスワード: (インストール時に設定したパスワード)

-- 使用方法:
-- psql -U postgres -f setup-db.sql

