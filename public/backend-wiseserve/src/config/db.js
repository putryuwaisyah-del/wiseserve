const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:54320/postgres',
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
