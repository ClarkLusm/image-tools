# VPS CI/CD for `image-tools`

Tai lieu nay mo ta bo CI/CD artifact-only cho frontend `image-tools`. GitHub Actions se build release bundle tren CI, upload sang VPS, sau do VPS chi giai nen artifact va chay bang PM2. Server khong can clone source code.

## Tong quan

Repo da co cac file sau:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-production.yml`
- `scripts/package-release.sh`
- `scripts/deploy-artifact.sh`
- `ecosystem.config.cjs`

Flow:

1. Pull request chay `lint + build`.
2. Push vao `main` se chay `lint + build + package`.
3. CI tao artifact tu Next.js `standalone` output.
4. CI upload `.tgz` sang VPS.
5. VPS tu dong tim artifact/script vua upload trong `/tmp`, giai nen vao `releases/<release-id>`, cap nhat symlink `current`, roi `pm2 reload`.

## Artifact release chua gi

Bundle deploy cho FE se chua:

- `server.js` va runtime `node_modules` tu `.next/standalone`
- `.next/static`
- `public`
- `ecosystem.config.cjs`

VPS khong can `src/`, `.git`, hay ma nguon TypeScript.

## Yeu cau tren VPS

Cai san:

- Node.js 22
- PM2
- Nginx

Lenh tham khao:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

Frontend artifact khong can `pnpm` tren server.

## Cau truc thu muc tren VPS

Khuyen nghi:

```text
/var/www/image-tools
/var/www/image-tools/releases
/var/www/image-tools/shared
/var/www/image-tools/current -> /var/www/image-tools/releases/<release-id>
```

Khoi tao:

```bash
sudo mkdir -p /var/www/image-tools/releases /var/www/image-tools/shared
sudo chown -R $USER:$USER /var/www/image-tools
```

## Env build-time

`NEXT_PUBLIC_*` cua Next.js la build-time env. Nghia la can set tren GitHub Actions, khong phai chi tren VPS.

Environment `production` cua repo FE nen co variables:

- `NEXT_PUBLIC_IMAGE_TOOLS_API_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` neu dung Google Analytics 4

Vi du:

- `NEXT_PUBLIC_IMAGE_TOOLS_API_URL=https://api.example.com/v1`
- `NEXT_PUBLIC_SITE_URL=https://example.com`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

## Env runtime tren VPS

Frontend artifact co the chay ma khong can file `.env` rieng neu ban chi can `PORT`.

Neu muon co them runtime env cho Next server, tao file:

```text
/var/www/image-tools/shared/.env
```

Vi du:

```env
PORT=3001
```

`ecosystem.config.cjs` se tu dong nap file nay neu ton tai.

## GitHub Secrets

Them cac secret sau trong repository settings:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_PORT`

`VPS_SSH_KEY` la private key dung de SSH vao VPS.

## GitHub Environment

Tao environment `production` va them variables:

- `APP_ROOT=/var/www/image-tools`
- `PM2_APP_NAME=image-tools`
- `PORT=3001`
- `KEEP_RELEASES=5`
- `NEXT_PUBLIC_IMAGE_TOOLS_API_URL=https://api.example.com/v1`
- `NEXT_PUBLIC_SITE_URL=https://example.com`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

Co the them:

- `SHARED_ENV_FILE=/var/www/image-tools/shared/.env`

Neu khong them, script se mac dinh dung duong dan do.

## Khoi dong thu cong lan dau

Sau khi tao thu muc, co the deploy lan dau bang cach push `main` hoac chay tay workflow `Deploy Production VPS`.

Kiem tra:

```bash
pm2 status image-tools
pm2 logs image-tools --lines 100
```

## Nginx reverse proxy

Neu dung Nginx:

- `example.com` -> `127.0.0.1:3001`

Vi du:

```nginx
server {
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Cach workflow deploy hoat dong

Workflow `deploy-production.yml` se:

1. `pnpm install`
2. `pnpm lint`
3. `pnpm build`
4. `bash ./scripts/package-release.sh`
5. upload `image-tools-release.tgz` va `deploy-artifact.sh` len `/tmp`
6. tu dong tim artifact/script vua upload trong `/tmp` roi chay deploy script tren VPS

Script deploy tren VPS se:

1. giai nen artifact vao `releases/<release-id>`
2. link file env chung neu co
3. cap nhat symlink `current`
4. `pm2 startOrReload ecosystem.config.cjs --update-env`
5. xoa cac release cu theo `KEEP_RELEASES`

## Rollback

Rollback nhanh tren VPS:

```bash
cd /var/www/image-tools/releases
ls -1
ln -sfn /var/www/image-tools/releases/<release-cu> /var/www/image-tools/current
cd /var/www/image-tools/current
PM2_APP_NAME=image-tools PORT=3001 pm2 startOrReload ecosystem.config.cjs --update-env
```

## Luu y

- VPS chi chay artifact, khong can clone repo.
- Neu thay doi `NEXT_PUBLIC_IMAGE_TOOLS_API_URL` hoac `NEXT_PUBLIC_SITE_URL`, can build lai artifact moi.
- Neu thay doi `NEXT_PUBLIC_GA_MEASUREMENT_ID`, can build lai artifact moi.
- `standalone` output giup frontend chay doc lap tren server ma khong can cai source hay `pnpm install` o VPS.
