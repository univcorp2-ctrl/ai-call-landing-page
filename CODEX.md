# CODEX

## 開発エージェント向けメモ

このrepoは、AI電話受付サービスLPの再現デモです。既存LPの完全コピーではなく、同等の構成・CV導線を持つオリジナル実装として維持してください。

## 守ること

- 実在企業の商標、ロゴ、画像、文章をコピーしない。
- 実績数値・導入社名・料金を本物のように断言しない。
- 本番用にする場合はプライバシー、録音同意、個人情報保護、広告表現を必ず確認する。
- 文言データはできるだけ `src/content.js` に集約する。
- 料金ロジックは `src/utils.js` に保持し、テストを追加する。

## 品質チェック

```bash
npm run lint
npm test
npm run build
```

## CI

`.github/workflows/ci.yml` が push / pull_request / workflow_dispatch で lint、test、build、artifact upload を実行します。
