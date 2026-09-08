const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'wiseserve-super-secret-key-2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: 'HS256'
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['HS256']
  });
}

module.exports = { signAccessToken, verifyAccessToken };
