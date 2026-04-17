# Web制作 汎用テンプレート

## フォルダー構成

```
template/
├── src/                    # 作業フォルダー
│   ├── index.html
│   ├── images/             # 画像素材
│   ├── js/
│   │   └── main.js
│   └── sass/
│       ├── style.scss      # エントリーポイント
│       ├── base/           # リセット・変数・ミックスイン・ベース
│       ├── global/         # ヘッダー・フッター
│       ├── module/         # 共通パーツ（ボタン・inner等）
│       ├── page/           # ページ固有スタイル
│       └── plugin/         # 外部ライブラリ上書き
├── dist/                   # コンパイル後（納品物）
├── gulpfile.js
├── package.json
└── .gitignore
```

## セットアップ

```bash
npm install
```

## 開発サーバー起動

```bash
npm start
```

ブラウザが自動で開きます。ファイルを保存するたびに自動リロードされます。

## 本番ビルド

```bash
npm run build
```

`dist/` フォルダーに納品用ファイルが出力されます。

## 新しいページを追加する場合

1. `src/` に HTMLファイルを追加
2. 必要に応じて `src/sass/page/` に `_ページ名.scss` を作成
3. `style.scss` の page セクションに `@use` を追記
