# Funseek Shipment Management System with Neon Database

[![Netlify Status](https://api.netlify.com/api/v1/badges/945a3849-9c99-4889-a0a5-5756a29d1046/deploy-status)](https://app.netlify.com/projects/fanqu/deploys)

这是一个使用 Neon 无服务器数据库的货运管理系统。

## 安装和设置

1. 首先安装项目依赖：
```bash
npm install
```

2. 配置环境变量：
   - 复制 `.env` 文件并根据您的 Neon 数据库配置进行修改
   - 在 `.env` 文件中设置 `NETLIFY_DATABASE_URL` 为您的 Neon 数据库连接字符串

3. 启动开发服务器：
```bash
npm run dev
```

4. 或者启动生产服务器：
```bash
npm start
```

## 使用 Neon 数据库

本项目已配置为使用 Neon 无服务器数据库，具有以下优势：
- 自动扩展
- 按使用量计费
- 与 PostgreSQL 完全兼容
- 更好的性能和更低的成本

## API 端点

- `GET /api/products` - 获取所有产品
- `POST /api/products` - 创建新产品
- `PUT /api/products/:id` - 更新产品
- `DELETE /api/products/:id` - 删除产品
- `GET /api/tasks` - 获取所有任务
- `POST /api/tasks` - 创建新任务
- `PUT /api/tasks/:id` - 更新任务
- `DELETE /api/tasks/:id` - 删除任务
- `GET /api/history` - 获取历史记录
- `GET /api/activities` - 获取活动记录
- `GET /adminer` - 数据库管理界面

## 部署到 Netlify

如果要部署到 Netlify，确保在 Netlify 控制台中设置了 `DATABASE_URL` 环境变量。

## 重要说明

在使用此项目之前，请确保：
1. 已在 Neon 上创建了数据库
2. 已将正确的连接字符串添加到环境变量中
3. 数据库具有所需的表结构（服务器启动时会自动创建）
