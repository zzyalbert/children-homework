# 仲城铄个人作文展览馆 (Next.js)

定位：
- 这是仲城铄的私人作文展览馆
- 主要用于展示个人作文作品与成长记录
- 仅供家人和朋友阅读与留存

## 启动

```bash
cp .env.example .env.local
# 修改 ADMIN_PASSWORD / TURSO_DATABASE_URL / TURSO_AUTH_TOKEN / BLOB_READ_WRITE_TOKEN
npm install
npm run dev
```

## 环境变量

- `ADMIN_PASSWORD`：后台登录密码
- `TURSO_DATABASE_URL`：Turso 数据库 URL（例如 `libsql://xxx.turso.io`）
- `TURSO_AUTH_TOKEN`：Turso 访问令牌
- `BLOB_READ_WRITE_TOKEN`：Vercel Blob 读写令牌（用于图片上传）

## 主要路由

- `/` 展馆首页
- `/essays` 作品展厅
- `/essays/[slug]` 作品详情
- `/admin/login` 展馆管理登录
- `/admin` 展馆管理台
