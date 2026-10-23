# 移動記録(交通行動調査 Webアプリ プロトタイプ)

出発 / 乗換 / 到着 のボタン操作と、移動中の経路(位置情報)をサーバーへ送信してMySQLに保存します。
Android の Chrome での利用を想定しています。

## 構成
- `public/index.html` … 画面(HTML/JS)。選択肢(性別・移動手段・移動目的)は冒頭の `GENDERS` / `MODES` / `PURPOSES` を編集
- `api/*.js` … Vercel Functions(Node.js)
- `lib/db.js` … MySQL接続
- `schema.sql` … テーブル定義

## セットアップ
1. 外部のマネージドMySQL(TiDB Cloud、Aiven など)を用意し、`schema.sql` を実行
2. このフォルダをGitHubにpushし、Vercelで Import
3. Vercelの環境変数に `DATABASE_URL` を設定
   例: `mysql://ユーザー:パスワード@ホスト:ポート/データベース名`
   (TLSを使わないDBの場合のみ `DB_SSL=false` も設定)
4. デプロイ後、AndroidのChromeでURLを開き、性別と年齢を入力(匿名の参加者IDは端末が自動で作ります)

すでに旧版の `schema.sql` を実行済みの場合は、次を実行してください。
```
ALTER TABLE participants ADD COLUMN gender VARCHAR(16) NULL, ADD COLUMN age SMALLINT NULL;
```

`vercel.json` の `regions` は東京(hnd1)です。DBのリージョンに近いものに変えてください。

## ローカル確認
```
npm install
npx vercel dev   # .env に DATABASE_URL を書いておく
```

## 注意
- 位置取得は画面を点けている間のみ有効です(バックグラウンドでは止まります)
- 認証はありません。本番運用前にAPIの保護(参加者トークンなど)を検討してください
- 日時はUTCで保存しています
