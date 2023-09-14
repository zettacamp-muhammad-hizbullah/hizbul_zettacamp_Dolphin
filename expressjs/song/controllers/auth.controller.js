const { generateToken } = require("../services/auth.service");

exports.login = async (req, res) => {
  const reqBody = req?.body;
  const { username, password } = reqBody;

  const result = await generateToken(username, password);

  res.json({
    success: true,
    data: result,
    message: 'token type bearer',
    errors: null,
  });
};
