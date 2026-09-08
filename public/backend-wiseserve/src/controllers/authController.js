const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { signAccessToken } = require('../config/auth');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.trim().toLowerCase()]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signAccessToken({
      sub: String(user.id),
      email: user.email,
      store_id: user.store_id
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
