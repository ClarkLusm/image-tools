#!/usr/bin/env bash

set -euo pipefail

APP_ROOT="${APP_ROOT:?APP_ROOT is required}"
ARTIFACT_PATH="${ARTIFACT_PATH:?ARTIFACT_PATH is required}"
PM2_APP_NAME="${PM2_APP_NAME:?PM2_APP_NAME is required}"
PORT="${PORT:-3000}"
RELEASE_ID="${RELEASE_ID:-$(date +%Y%m%d%H%M%S)}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
SHARED_ENV_FILE="${SHARED_ENV_FILE:-${APP_ROOT}/shared/.env}"

RELEASES_DIR="${APP_ROOT}/releases"
SHARED_DIR="${APP_ROOT}/shared"
CURRENT_LINK="${APP_ROOT}/current"
RELEASE_DIR="${RELEASES_DIR}/${RELEASE_ID}"

echo "==> Activating release ${RELEASE_ID}"
echo "App root: ${APP_ROOT}"
echo "Artifact: ${ARTIFACT_PATH}"

mkdir -p "${RELEASES_DIR}" "${SHARED_DIR}"
rm -rf "${RELEASE_DIR}"
mkdir -p "${RELEASE_DIR}"

tar -xzf "${ARTIFACT_PATH}" -C "${RELEASE_DIR}"

if [ -f "${SHARED_ENV_FILE}" ]; then
  ln -sfn "${SHARED_ENV_FILE}" "${RELEASE_DIR}/.env"
fi

ln -sfn "${RELEASE_DIR}" "${CURRENT_LINK}"

cd "${CURRENT_LINK}"

export NODE_ENV=production
export HOSTNAME=0.0.0.0
export PORT
export PM2_APP_NAME
export SHARED_ENV_FILE

pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save
pm2 status "${PM2_APP_NAME}"

if [ -d "${RELEASES_DIR}" ]; then
  mapfile -t RELEASE_PATHS < <(find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d | sort -r)

  if [ "${#RELEASE_PATHS[@]}" -gt "${KEEP_RELEASES}" ]; then
    for OLD_RELEASE in "${RELEASE_PATHS[@]:${KEEP_RELEASES}}"; do
      rm -rf "${OLD_RELEASE}"
    done
  fi
fi

rm -f "${ARTIFACT_PATH}"

echo "==> Release ${RELEASE_ID} is live"
