const { decodeBasicAuth } = require('../utils/index.util');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('unauthenticated');

    const { name, password } = decodeBasicAuth(req.headers.authorization);
    if (name === 'admin' && password === 'password') {
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
