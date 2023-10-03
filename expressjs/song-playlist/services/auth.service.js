const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/app.config');
const model = require('../models/index.model');
const bcrypt = require('bcrypt');
const { ApolloError } = require('apollo-server-express');

exports.generateToken = async (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

exports.authenticatedUser = async (username) => {
  try {
    const user = await model.user.findOne({ username: username });
    return user;
  } catch (error) {
    console.error('auth.service => authenticatedUser', error);
    throw new ApolloError('Something wrong', 'INTERNAL_SERVER_ERROR');
  }
};

exports.loginUser = async (payload) => {
  const user = await model.user.findOne({ username: payload.username });
  const isValid = await bcrypt.compare(payload.password, user.password);
  if (isValid) {
    const sign = {
      _id: user?._id,
      username: user?.username,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };

    const token = await this.generateToken(sign);
    return token;
  } else {
    console.error('auth.service => loginUser');
    throw new ApolloError('Something wrong', 'INTERNAL_SERVER_ERROR');
  }
};

exports.registerUser = async (payload) => {
  try {
    const result = await model.user.create(payload);
    return result;
  } catch (error) {
    console.error('auth.service => registerUser', error);
    throw new ApolloError('Something wrong', 'INTERNAL_SERVER_ERROR');
  }
};
