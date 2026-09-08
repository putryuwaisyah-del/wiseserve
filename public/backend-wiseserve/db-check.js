const pool = require('./src/config/db');

async function checkDatabase() {
  try {
    const database = await pool.query('SELECT NOW() AS server_time');
    const menu = await pool.query('SELECT * FROM menu_items LIMIT 5');
    console.log('Database connected successfully!');
    console.log('Server time:', database.rows[0].server_time);
    console.table(menu.rows);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

checkDatabase();
