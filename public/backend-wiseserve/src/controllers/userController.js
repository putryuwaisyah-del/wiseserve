const pool = require('../config/db');

exports.getMe = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, store_id, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
