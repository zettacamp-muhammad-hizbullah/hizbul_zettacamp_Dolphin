const { generateToken } = require("../services/auth.service");

exports.login = async (req, res) => {
  const reqBody = req?.body;
  const { username, password } = reqBody;

  const payload = {
    username,
  };
  const result = await generateToken(payload);
  return {
    token: result,
    user: {
      username,
    },
  };
};
