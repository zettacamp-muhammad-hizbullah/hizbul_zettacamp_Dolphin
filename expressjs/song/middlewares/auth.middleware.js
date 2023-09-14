const { SECRET_KEY } = require('../config/app.config');
const { decodeBasicAuth, getToken } = require('../utils/index.util');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('unauthenticated');

    const token = getToken(req.headers.authorization);
    console.log(token);
    const isVerified = jwt.verify(token, SECRET_KEY)
    console.log(isVerified);
    
    if (isVerified) {
      next();
    } else {
      throw new Error('unauthenticated');
    }
  } catch (error) {
    res.status(401).json({
      message: error?.message,
    });
    return;
  }
};
