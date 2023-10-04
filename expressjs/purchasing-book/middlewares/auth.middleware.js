const { ApolloError } = require('apollo-server-express');
const { SECRET_KEY } = require('../config/app.config');
const { getToken } = require('../utils/index.util');
const jwt = require('jsonwebtoken');

module.exports = async (parent, args, context) => {
  try {
    const rawToken = context.req.headers.authorization || '';
    if (!rawToken) throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');

    const token = getToken(rawToken);
    const decodedPayload = jwt.verify(token, SECRET_KEY);

    context.user = decodedPayload;
  } catch (error) {
    throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
  }
};
