#!/usr/bin/env bash

set -euo pipefail

RELEASE_DIR=".release/package"
ARTIFACT_PATH=".release/image-tools-release.tgz"

rm -rf .release
mkdir -p "${RELEASE_DIR}/.next"

cp -R .next/standalone/. "${RELEASE_DIR}/"
cp -R .next/static "${RELEASE_DIR}/.next/static"

rm -f "${RELEASE_DIR}/.env"

if [ -d public ]; then
  cp -R public "${RELEASE_DIR}/public"
fi

cp ecosystem.config.cjs "${RELEASE_DIR}/ecosystem.config.cjs"

if [ -f .env.example ]; then
  cp .env.example "${RELEASE_DIR}/.env.example"
fi

tar -czf "${ARTIFACT_PATH}" -C "${RELEASE_DIR}" .

echo "Created release artifact at ${ARTIFACT_PATH}"
