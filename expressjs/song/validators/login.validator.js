exports.loginValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const { username, password } = reqBody;

  if (username === 'admin' && password === 'password') {
    next();
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: null,
      errors: 'unauthenticated',
    });
    return;
  }
};
