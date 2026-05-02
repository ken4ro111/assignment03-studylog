# 学習管理アプリ

React + TypeScript + Vite で作成した学習記録管理アプリです。  
Supabase に保存した学習記録を一覧表示し、新規登録、更新、削除ができます。

## 主な機能

- ログイン画面から学習記録一覧画面へ遷移
- 学習記録一覧の取得と表示
- 学習記録の新規登録
- 学習記録の更新
- 学習記録の削除
- 未入力、`0以上` などの入力バリデーション

## 使用技術

- React 19
- TypeScript
- Vite
- Chakra UI
- React Hook Form
- React Router
- Supabase
- Vitest
- Testing Library

## セットアップ

1. 依存関係をインストールします。

```bash
npm install
```

2. 環境変数を設定します。`.env` などに以下を定義してください。

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. 開発サーバーを起動します。

```bash
npm run dev
```

## 利用できるコマンド

- `npm run dev`: 開発サーバーを起動
- `npm run build`: 本番用ビルドを作成
- `npm run preview`: ビルド結果をローカル確認
- `npm run lint`: ESLint を実行
- `npm run lint:fix`: ESLint の自動修正
- `npm run format`: Prettier で整形
- `npm run format:check`: Prettier のチェック
- `npm test`: Vitest を一括実行
- `npm run test:watch`: Vitest を watch モードで実行

## 画面構成

- `/`
  ログイン画面
- `/study-records`
  学習記録一覧画面

## 実装メモ

- Supabase との通信は `src/utils/supabaseFunction.ts` にまとめています。
- 学習記録の登録・更新フォームは `src/components/organisms/studyRecord/StudyRecordModal.tsx` で共通化しています。
- 一覧画面では `selectedRecord` の有無で新規登録モードと更新モードを切り替えています。
- `src/components/organisms/studyRecord/CreateModal.tsx` と `src/components/organisms/studyRecord/UpdateModal.tsx` は、共通 modal を用途別に包む薄いラッパーです。

## テスト

以下の観点を中心に UI テストを用意しています。

- ログイン画面の表示と遷移
- 404 画面の表示
- 学習記録一覧画面のローディング表示、一覧表示、削除
- 共通 modal の新規登録モード、更新モード、初期値表示
- 登録・更新時の必須バリデーション
- 学習時間の `0以上` バリデーション

テスト実行:

```bash
npm test
```
