const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/app.config');

exports.generateToken = async (username, password) => {
  const token = jwt.sign(
    {
      username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  console.log('token generated => ', token);
  return token;
};
