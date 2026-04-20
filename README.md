# nomach-renovate

TasukuKuchinomachi 個人アカウント向けセルフホスト Renovate。1つのリポから `autodiscover` で対象リポを一括管理します。

## 構成

- `config.js` — self-hosted ランナーの設定。`autodiscover: true` + `autodiscoverFilter: ["TasukuKuchinomachi/*"]` で個人アカウント配下のインストール済みリポを対象にする
- `default.json` — 共有プリセット。対象リポの `renovate.json` から `"extends": ["github>TasukuKuchinomachi/nomach-renovate"]` で参照
- `.github/workflows/renovate.yml` — 毎日 9:00 JST に走るスケジューラ。手動起動(dryRun, logLevel 指定可)も可能
- `.github/workflows/validate.yml` — `default.json` 等の構文検証 (PR/push時)

## セットアップ

### 1. GitHub App 発行

個人Settings → Developer settings → GitHub Apps → **New GitHub App**

- Name: `nomach-renovate`
- Homepage URL: `https://github.com/TasukuKuchinomachi/nomach-renovate`
- Webhook: **Active OFF**
- Repository permissions:
  - Contents: **Read & write**
  - Pull requests: **Read & write**
  - Issues: **Read & write** (Dependency Dashboard 用)
  - Metadata: **Read** (必須)
  - Workflows: **Read & write** (`.github/workflows/*` 更新用)
  - Dependabot alerts: **Read** (脆弱性対応用)
- Create App 後:
  1. **App ID** をメモ
  2. **Generate a private key** で `.pem` をダウンロード
  3. **Install App** → 自分のアカウントを選択し、管理対象リポだけに限定してインストール

### 2. Secrets 登録

このリポの Settings → Secrets and variables → Actions で以下を登録:

- `RENOVATE_APP_ID` — App ID (数値)
- `RENOVATE_APP_PRIVATE_KEY` — `.pem` の中身 (改行込みでそのまま貼り付け)

### 3. 初回起動

Actions タブ → `Renovate` → `Run workflow`

- `logLevel: debug`, `dryRun: full` で試走するとログだけ出て PR は作らない
- 問題なければ `dryRun: null` で実行 → `Renovate Dependency Dashboard` issue と onboarding PR が各対象リポに作成される

## 新規リポの追加

1. GitHub App の **Install configuration** で該当リポをインストール対象に追加
2. 次回の自動実行(または手動起動)で Renovate が onboarding PR を作成
3. onboarding PR の `renovate.json` をレビューしてマージ → 以降、依存更新 PR が定期作成される

## 運用メモ

- **一時停止(全体)**: `renovate.json` に `"enabled": false` を追加してマージ
- **対象リポだけ停止**: GitHub App のインストール対象から外す
- **特定の依存だけ止める**: `default.json` または対象リポの `renovate.json` に `packageRules` で `matchPackageNames` を指定して `"enabled": false`
- **Dependency Dashboard** issue は各対象リポに自動作成され、Renovate が毎回上書きする。閉じない

## ローカル検証

```
npx --yes --package renovate -- renovate-config-validator --strict default.json renovate.json config.js
```

## ライセンス

MIT
