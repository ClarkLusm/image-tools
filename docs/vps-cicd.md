# VPS CI/CD for `image-tools`

Tai lieu nay mo ta bo workflow CI/CD cu the de deploy frontend `image-tools` len VPS bang GitHub Actions + SSH + PM2.

## Tong quan

Repo da co cac file sau:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-production.yml`
- `scripts/deploy-vps.sh`
- `ecosystem.config.cjs`

Flow:

1. PR hoac push vao `main` se chay CI.
2. Push vao `main` se deploy production.
3. VPS se `git pull`, `pnpm install`, `pnpm build`, sau do `pm2 startOrReload`.

## Yeu cau tren VPS

Cai san:

- Git
- Node.js 22
- pnpm 9
- PM2

Lenh tham khao:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pnpm pm2
```

## Cau truc thu muc tren VPS

Khuyen nghi:

```text
/var/www/image-tools
```

Thu muc nay la clone repo production tren VPS.

Vi du:

```bash
git clone <your-repo-url> /var/www/image-tools
```

## Env tren VPS

Tao file env trong app dir:

- production: `/var/www/image-tools/.env`

Vi du:

```env
NEXT_PUBLIC_IMAGE_TOOLS_API_URL=https://api.example.com/v1
```

## Khoi dong thu cong lan dau

Sau khi clone repo va tao `.env`:

```bash
cd /var/www/image-tools
pnpm install
pnpm build
PM2_APP_NAME=image-tools PORT=3000 pm2 start ecosystem.config.cjs --update-env

pm2 save
```

## GitHub Secrets

Them cac secret sau trong repository settings.

Dung chung:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_PORT`

`VPS_SSH_KEY` la private key dung de SSH vao server.

## GitHub Environments

Tao environment `production`.

Trong environment nay, tao variables:

- `APP_DIR`
- `PM2_APP_NAME`
- `PORT`

Vi du:

- `APP_DIR=/var/www/image-tools`
- `PM2_APP_NAME=image-tools`
- `PORT=3000`

## Nginx reverse proxy

Neu dung Nginx tren VPS, co the map:

- `example.com` -> `127.0.0.1:3000`

Vi du cho production:

```nginx
server {
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
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

### Production

- Trigger: push vao `main` hoac chay tay `workflow_dispatch`
- Action:
  - SSH vao VPS
  - `cd $APP_DIR`
  - `bash ./scripts/deploy-vps.sh production`

## Rollback

Rollback nhanh tren VPS:

```bash
cd /var/www/image-tools
git log --oneline -n 5
git checkout <commit-cu-on-dinh>
pnpm install --frozen-lockfile
pnpm build
PM2_APP_NAME=image-tools PORT=3000 pm2 startOrReload ecosystem.config.cjs --update-env
```

Neu muon quay lai flow git chuan, sau rollback nen tao `hotfix/*` hoac revert tren `main`.

## Luu y

- Workflow deploy nay gia dinh repo da duoc clone san tren VPS.
- Workflow nay cung gia dinh VPS da cai `pnpm`, `pm2`, `node`.
- `scripts/deploy-vps.sh` dung `git pull --ff-only` de tranh auto merge bat ngo.
- Cac workflow nay da duoc toi gian cho 1 VPS nho, khong chay song song staging va production.
