const { ApolloError } = require('apollo-server-express');
const { generateToken } = require('../services/auth.service');

exports.login = async (_, args) => {
  try {
    const reqBody = args;
    const { username } = reqBody;

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
  } catch (error) {
    throw new ApolloError('SOMETHING WRONG');
  }
};
