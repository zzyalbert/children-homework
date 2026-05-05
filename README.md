# 仲城铄个人作文展览馆 (Next.js)

定位：
- 这是仲城铄的私人作文展览馆
- 主要用于展示个人作文作品与成长记录
- 仅供家人和朋友阅读与留存

## 启动

```bash
cp .env.example .env.local
# 修改 ADMIN_PASSWORD
npm install
npm run dev
```

## 主要路由

- `/` 展馆首页
- `/essays` 作品展厅
- `/essays/[slug]` 作品详情
- `/admin/login` 展馆管理登录
- `/admin` 展馆管理台
