#!/usr/bin/env bash

set -euo pipefail

ENVIRONMENT="${1:-production}"
APP_DIR="${APP_DIR:?APP_DIR is required}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-image-tools-${ENVIRONMENT}}"
PORT="${PORT:-3000}"

echo "==> Deploying image-tools"
echo "Environment: ${ENVIRONMENT}"
echo "Branch: ${BRANCH}"
echo "App dir: ${APP_DIR}"
echo "PM2 app name: ${PM2_APP_NAME}"
echo "Port: ${PORT}"

cd "${APP_DIR}"

git config --global --add safe.directory "${APP_DIR}"

git fetch origin "${BRANCH}"

if git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  git checkout "${BRANCH}"
else
  git checkout -b "${BRANCH}" "origin/${BRANCH}"
fi

git pull --ff-only origin "${BRANCH}"

if command -v corepack >/dev/null 2>&1; then
  corepack enable
fi

pnpm install --frozen-lockfile
pnpm build

export NODE_ENV=production
export HOSTNAME=0.0.0.0
export PORT
export PM2_APP_NAME

pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save
pm2 status "${PM2_APP_NAME}"

echo "==> Deploy completed"
