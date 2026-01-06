# 部署到 Netlify 并使用 Neon 数据库

本指南将帮助您将 Funseek Shipment Management System 部署到 Netlify 并连接到 Neon 数据库。

## 步骤 1: 创建 Neon 数据库

1. 访问 [Neon 官网](https://neon.tech) 并创建一个账户
2. 创建一个新的项目
3. 记下您的数据库连接字符串，它应该类似于：
   ```
   postgresql://username:password@ep-xxxxxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

## 步骤 2: 配置 Netlify 项目

1. 将此代码库推送到 GitHub、GitLab 或 Bitbucket
2. 访问 [Netlify](https://netlify.com) 并创建一个新站点
3. 选择您的代码库并连接

## 步骤 3: 设置环境变量

在 Netlify 仪表板中:

1. 进入 "Site settings" > "Build & deploy" > "Environment"
2. 添加以下环境变量：
   - `NETLIFY_DATABASE_URL`: 您的 Neon 数据库连接字符串

## 步骤 4: 配置构建设置

Netlify 会自动检测到您的 Node.js 项目。构建设置应为:

- 构建命令: `npm install`
- 发布目录: (留空)
- 高级构建设置:
  - `NODE_VERSION`: `18` 或更高版本

## 步骤 5: 部署

1. 点击 "Deploy site" 按钮
2. Netlify 将自动安装依赖并启动应用程序
3. 首次部署时，数据库表将自动创建

## 验证部署

部署完成后，访问您的站点 URL 并确保:

1. 应用程序正常加载
2. 数据库连接成功（在部署日志中查看 "Neon 数据库连接成功" 消息）
3. 可以访问 API 端点

## 故障排除

如果遇到数据库连接问题:

1. 确认 `NETLIFY_DATABASE_URL` 环境变量设置正确
2. 检查 Neon 数据库是否允许来自外部服务的连接
3. 查看 Netlify 部署日志中的错误信息

## 使用 Netlify Functions (可选)

如果要使用 Netlify Functions 与数据库交互，您可以创建 `netlify/functions` 目录并使用以下示例:

```javascript
// netlify/functions/getPosts.js
import { neon } from '@neondatabase/serverless';

export async function handler(event, context) {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    const posts = await sql`SELECT * FROM posts`;
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch posts' }),
    };
  }
}
```

## 安全注意事项

1. 永远不要在客户端代码中暴露数据库连接字符串
2. 使用 Netlify 的环境变量来安全地存储敏感信息
3. 定期轮换数据库密码