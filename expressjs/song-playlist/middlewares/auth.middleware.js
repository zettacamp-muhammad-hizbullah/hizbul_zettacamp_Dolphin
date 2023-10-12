const { ApolloError } = require('apollo-server-express');
const { SECRET_KEY } = require('../config/app.config');
const { getToken } = require('../utils/index.util');
const jwt = require('jsonwebtoken');

exports.graphQlAuthMiddleware = (parent, args, ctx, info) => {
  try {
    const rawToken = ctx.req.headers.authorization || '';
    if (!rawToken) throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');

    const user = this.jwtAuthMiddleware(rawToken, true);
    ctx.user = user;
  } catch (error) {
    throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
  }
};

exports.restAuthMiddleware = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization || '';
    if (!rawToken) throw new Error('unauthenticated', 'UN_AUTHENTICATED');

    const user = this.jwtAuthMiddleware(rawToken);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'not ok',
      message: error?.message,
    });
  }
};

exports.jwtAuthMiddleware = (rawToken, isGraphQl = false) => {
  try {
    const token = getToken(rawToken);
    const decodedPayload = jwt.verify(token, SECRET_KEY);

    if (!decodedPayload) {
      if (isGraphQl) {
        throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
      } else {
        throw new Error('unauthenticated');
      }
    }
    return decodedPayload;
  } catch (error) {
    if (isGraphQl) {
      throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
    } else {
      throw new Error('unauthenticated');
    }
  }
};
