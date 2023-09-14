const { SECRET_KEY } = require('../config/app.config');
const { getToken } = require('../utils/index.util');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('unauthenticated');

    const token = getToken(req.headers.authorization);
    // console.log(token);
    // console.log(new Date());
    const decodedPayload = jwt.verify(token, SECRET_KEY);
    console.log('decodedPayload', decodedPayload);

    if (decodedPayload) {
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: error?.message,
    });
    return;
  }
};
