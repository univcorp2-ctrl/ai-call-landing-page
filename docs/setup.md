# Setup Guide

このrepoは、AI電話受付LPの再現デモをすぐ確認できるように構成されています。

## 1. Codespacesで確認する

1. GitHub repoを開きます。
2. `Code` ボタンを押します。
3. `Codespaces` タブを開きます。
4. `Create codespace on main` を押します。
5. 起動後、ターミナルで次を実行します。

```bash
npm run dev
```

6. `Open in Browser` またはポート `5173` のプレビューを開きます。

## 2. ローカルで確認する

Node.js 22以上を推奨します。

```bash
npm install
npm run dev
```

テストとビルド:

```bash
npm run lint
npm test
npm run build
```

## 3. 文言や料金を変更する

`src/content.js` を編集します。

- ブランド名: `site.brand`
- 電話番号: `site.phone`
- ヒーローコピー: `site.headline`, `site.subHeadline`
- 業種別事例: `industries`
- 機能一覧: `features`
- 料金: `pricing`
- FAQ: `faqItems`

## 4. デザインを変更する

`src/styles.css` の `:root` を編集します。

```css
:root {
  --primary: #0f766e;
  --accent: #f59e0b;
  --radius: 28px;
}
```

## 5. 本番デプロイする

### Vercel / Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

現時点ではPages workflowは入れていません。追加する場合は `dist/` をPages artifactとしてアップロードし、`actions/deploy-pages` を使います。

## 6. 本番で必ず差し替えるもの

- デモ電話番号 `050-0000-1234`
- 架空導入企業名
- 架空料金
- 送信先 `sales@example.com`
- FAQの注意書き
- プライバシーポリシーURL
- 実サービスの利用規約

## 7. 実電話AIサービス化に必要な設定

| 項目 | 例 |
| --- | --- |
| 電話API | Twilio / Vonage / Amazon Connect / 国内PBX |
| AI応答 | 音声認識、LLM、音声合成、会話フロー |
| DB | PostgreSQL / MySQL / SQLite for small internal use |
| 通知 | Slack / Teams / LINE WORKS / メール |
| 予約連携 | Google Calendar / 予約台帳 / CRM |
| 認証 | 管理画面ログイン、権限管理 |
| 法務 | 録音同意、個人情報保護、業界規制、広告表現チェック |

## 8. トラブルシュート

### `npm install` が失敗する

Node.jsのバージョンを確認してください。

```bash
node -v
```

22以上を推奨します。

### 画面が真っ白

ブラウザコンソールを開き、JavaScriptエラーを確認してください。まず次を実行します。

```bash
npm run build
```

### フォームが送信されない

このデモではサーバー送信せず、入力検証後にブラウザ内で完了表示します。本番ではWebhookやAPIに接続してください。
