const bcrypt = require('bcrypt');
const { registerUser, authenticatedUser, loginUser } = require('../services/auth.service');
const { SALT_ROUND } = require('../config/app.config');
const { ApolloError } = require('apollo-server-express');
const authMiddleware = require('../middlewares/auth.middleware');

exports.login = async (parent, args, ctx, info) => {
  const reqBody = args?.input;
  const { username, password } = reqBody;

  const payload = {
    username,
    password,
  };
  const result = await loginUser(payload);
  return {
    token: result,
    user: {
      username,
    },
  };
};

exports.register = async (parent, args, ctx, info) => {
  try {
    const reqBody = args?.input;
    const { username, password, first_name, last_name } = reqBody;

    const payload = {
      username,
      first_name,
      last_name,
      password,
    };

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    console.log('payload', payload);
    payload.password = hashedPassword;
    const result = await registerUser(payload);

    return result;
  } catch (error) {
    throw new ApolloError('Something wrong', 'INTERNAL_SERVER_ERROR');
  }
};

exports.me = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const { username } = ctx?.user;
    console.log('username', username);
    const result = await ctx.loaders.userLoader.load(username);
    // const result = await authenticatedUser(username);

    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('Something wrong', 'INTERNAL_SERVER_ERROR');
  }
};
