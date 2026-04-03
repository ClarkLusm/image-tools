# Gitflow Deploy Guide for `image-tools`

Tai lieu nay mo ta quy uoc branch, release flow va cach deploy an toan cho frontend `image-tools`.

## 1. Muc tieu

- Giu `main` luon o trang thai deploy production duoc.
- Gitflow phu hop voi truong hop chi co 1 VPS production.
- Tach ro cong viec feature, release va hotfix.
- Co checklist truoc khi merge/deploy de tranh loi FE runtime.

## 2. Nhanh su dung

- `main`
  - Nhanh production.
  - Moi commit tren nhanh nay phai o trang thai co the deploy.
  - Chi merge vao day tu `release/*` hoac `hotfix/*`.

- `develop`
  - Nhanh integration noi bo.
  - Dung de gom cac feature da xong va test chung.
  - Moi feature branch tach ra tu nhanh nay.

- `feature/*`
  - Vi du: `feature/upscale-page`, `feature/compress-sse`
  - Tach tu `develop`.
  - Merge nguoc ve `develop`.

- `release/*`
  - Vi du: `release/2026-04-03`, `release/v0.4.0`
  - Tach tu `develop` khi chuan bi len production.
  - Chi sua bug, copy, config nho, hoan thien release note.
  - Sau khi verify xong thi merge vao `main` va merge nguoc lai `develop`.

- `hotfix/*`
  - Vi du: `hotfix/fix-upscale-download`
  - Tach tu `main` khi production dang loi.
  - Sau khi xong merge vao ca `main` va `develop`.

## 3. Mapping moi truong

- `feature/*`: local dev.
- `develop`: integration branch, khong deploy len VPS.
- `main`: production.

Chi `main` moi deploy len VPS.

## 4. Bien moi truong

File FE hien tai dang can:

```env
NEXT_PUBLIC_IMAGE_TOOLS_API_URL=
```

Khuyen nghi tach theo moi truong:

- local: `http://localhost:3000/v1` hoac URL backend local cua ban
- production: URL `image-tools-api` production

Khong commit `.env`. Chi commit `.env.example`.

## 5. Quy trinh lam feature

1. Cap nhat nhanh goc:

```bash
git checkout develop
git pull origin develop
```

2. Tao nhanh feature:

```bash
git checkout -b feature/<ten-feature>
```

3. Trong qua trinh lam viec, truoc khi mo PR:

```bash
pnpm lint
pnpm build
```

4. Push branch va mo PR vao `develop`.

5. Sau khi review + test xong, merge vao `develop`.

## 6. Quy trinh release production

### B1. Cat release branch tu `develop`

```bash
git checkout develop
git pull origin develop
git checkout -b release/<ten-release>
git push origin release/<ten-release>
```

### B2. Verify tren release branch

Checklist:

- `pnpm lint` pass
- `pnpm build` pass
- cac flow quan trong hoat dong:
  - compress image
  - target compress
  - upscale image
  - crop image
  - convert formats
- bien `NEXT_PUBLIC_IMAGE_TOOLS_API_URL` dung moi truong
- khong co link chet trong navbar/sidebar
- kiem tra SEO can ban: title, sitemap, robots neu co thay doi page moi

### B3. Merge production

Sau khi verify xong tren release branch:

```bash
git checkout main
git pull origin main
git merge --no-ff release/<ten-release>
git push origin main
```

Luc nay production se deploy tu `main`.

### B4. Merge nguoc lai `develop`

```bash
git checkout develop
git pull origin develop
git merge --no-ff release/<ten-release>
git push origin develop
```

### B5. Tag release

```bash
git checkout main
git tag v0.1.0
git push origin v0.1.0
```

## 7. Quy trinh hotfix production

1. Tao nhanh tu `main`:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/<ten-hotfix>
```

2. Sua loi va verify:

```bash
pnpm lint
pnpm build
```

3. Mo PR vao `main`.

4. Sau khi deploy production xong, merge hotfix do nguoc lai `develop`.

## 8. Checklist PR

Moi PR vao `develop`, `release/*` hoac `main` nen dam bao:

- mo ta ro pham vi thay doi
- co screenshot/GIF neu thay doi UI
- neu dung `image-tools-api`, ghi ro API nao anh huong
- da test responsive neu sua layout
- da test desktop/mobile neu sua navbar/sidebar/tool layout
- da cap nhat route/menu/sitemap neu them tool moi
- neu release thang len production, can co nguoi verify smoke test sau deploy

## 9. Checklist deploy production

Truoc khi deploy `main`:

- xac nhan env production dung
- `pnpm lint` pass
- `pnpm build` pass
- backend `image-tools-api` production dang san sang
- kiem tra cac tool dang goi truc tiep API:
  - compress
  - target compress
  - upscale
- kiem tra SSE stream cho job progress neu release co lien quan den jobs

Sau khi deploy:

- smoke test trang home
- smoke test 1 tool sync local
- smoke test 1 tool async theo job id
- kiem tra console browser khong co runtime error

## 10. Rollback

Neu production loi:

- rollback bang cach redeploy tag/commit production cu
- hoac revert commit tren `main`
- sau khi rollback, tao `hotfix/*` de xu ly tan goc

Khong sua truc tiep tren server ma khong co commit trong git.

## 11. Quy uoc de team de van hanh

- Khong commit thang vao `main`.
- Khong deploy production tu `develop`.
- Feature lon nen merge vao `develop` qua PR nho, khong doi den luc qua to.
- Release branch chi dung de on dinh hoa, khong nhan them feature moi.
- Hotfix xong phai merge nguoc lai `develop` de tranh mat code.
- Vi chi co 1 VPS nho, tranh giu them 1 moi truong staging tren cung may.

## 12. Lenh can dung thuong xuyen

```bash
pnpm install
pnpm lint
pnpm build
pnpm dev
```

## 13. Flow de xuat ngan gon

```text
feature/* -> develop -> release/* -> main
                     \\-> fix tren release neu can truoc khi len production

hotfix/* -> main
         -> develop
```
