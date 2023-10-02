const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/app.config');

exports.generateToken = async (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};
