/**
 * 数据库设置脚本
 * 用于初始化 Neon 数据库连接和表结构
 */

require('dotenv').config(); // 加载环境变量

const { neon } = require('@netlify/neon');
const connectionString = process.env.NETLIFY_DATABASE_URL;

if (!connectionString) {
  console.error('错误: 未找到 NETLIFY_DATABASE_URL 环境变量');
  console.log('请确保在 .env 文件中设置了 NETLIFY_DATABASE_URL');
  process.exit(1);
}

const sql = neon(connectionString);

console.log('开始设置数据库...');

// 创建产品表
const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_supplier VARCHAR(255),
    quantity INTEGER DEFAULT 0,
    purchase_price DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// 创建任务表
const createTasksTable = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task_number VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    items JSONB,
    body_code_image TEXT,
    barcode_image TEXT,
    warning_code_image TEXT,
    label_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
  );
`;

// 创建历史记录表
const createHistoryTable = `
  CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    task_number VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    items JSONB,
    body_code_image TEXT,
    barcode_image TEXT,
    warning_code_image TEXT,
    label_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
  );
`;

// 创建活动表
const createActivitiesTable = `
  CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    time VARCHAR(255),
    type VARCHAR(50),
    details TEXT,
    user VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function setupDatabase() {
  try {
    console.log('连接到 Neon 数据库...');
    
    // 测试连接
    const testResult = await sql`SELECT NOW()`;
    console.log('数据库连接成功');
    
    console.log('创建产品表...');
    await sql(createProductsTable);
    
    console.log('创建任务表...');
    await sql(createTasksTable);
    
    console.log('创建历史记录表...');
    await sql(createHistoryTable);
    
    console.log('创建活动表...');
    await sql(createActivitiesTable);
    
    console.log('\n数据库表创建完成！');
    console.log('表结构:');
    console.log('- products: 产品信息表');
    console.log('- tasks: 任务信息表');
    console.log('- history: 历史记录表');
    console.log('- activities: 活动日志表');
    
    // 显示表信息
    const tablesResult = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name IN ('products', 'tasks', 'history', 'activities');
    `;
    
    console.log('\n当前数据库中存在的表:');
    tablesResult.forEach(row => {
      console.log(`- ${row.table_name}`);
    });
    
  } catch (err) {
    console.error('数据库设置过程中出现错误:', err);
    process.exit(1);
  }
}

// 运行设置函数
setupDatabase();

module.exports = { setupDatabase };