// 加载环境变量
require('dotenv').config();

// 使用 Netlify Neon 连接数据库
const { neon } = require('@netlify/neon');

// 从环境变量获取 Neon 数据库连接字符串
const connectionString = process.env.NETLIFY_DATABASE_URL;

if (!connectionString) {
  console.error('错误: 未找到 NETLIFY_DATABASE_URL 环境变量');
}

const sql = neon(connectionString);

// 测试数据库连接
try {
  sql`SELECT 1`;
  console.log('Neon 数据库连接成功');
} catch (err) {
  console.error('Neon 数据库连接失败:', err);
}

module.exports = {
  query: async (text, params) => {
    // 将 PostgreSQL 查询语法转换为 Neon 兼容格式
    if (params && params.length > 0) {
      // 对于带参数的查询，使用模板字符串方式
      const queryResult = await sql(text, ...params);
      return {
        rows: queryResult,
        rowCount: queryResult.length
      };
    } else {
      // 对于无参数查询，直接执行
      const queryResult = await sql(text);
      return {
        rows: queryResult,
        rowCount: queryResult.length
      };
    }
  },
};