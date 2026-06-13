#!/usr/bin/env bash
# Cloudflare Workers へデプロイ（OpenNext）
# 事前: npx wrangler login  または  CLOUDFLARE_API_TOKEN を設定
# macOS 12 など: opennextjs-cloudflare deploy ではなく wrangler deploy を直接使う

set -euo pipefail
cd "$(dirname "$0")/.."

# プロキシ経由だと wrangler が 403 で失敗することがある
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy ALL_PROXY all_proxy 2>/dev/null || true

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "Error: Cloudflare に未ログインです。"
  echo "  npx wrangler login"
  echo "  または .env.local / 環境変数に CLOUDFLARE_API_TOKEN を設定してください。"
  echo "  （Account ID が必要な場合は CLOUDFLARE_ACCOUNT_ID も）"
  exit 1
fi

echo "==> OpenNext build"
npm run build:cf

echo "==> wrangler deploy (OPEN_NEXT_DEPLOY=true)"
OPEN_NEXT_DEPLOY=true npx wrangler deploy

echo ""
echo "デプロイ後、Sanity トークンが未設定なら:"
echo "  npx wrangler secret put SANITY_API_TOKEN"
echo ""
echo "本番 URL を Sanity / OGP 用に使う場合:"
echo "  npx wrangler secret put NEXT_PUBLIC_SITE_URL"
echo "  （値は https://sonocafe-portfolio.<account>.workers.dev など）"
