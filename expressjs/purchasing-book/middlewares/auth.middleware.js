const { ApolloError } = require('apollo-server-express');
const { SECRET_KEY } = require('../config/app.config');
const { publicOperation } = require('../graphql/typeDefs');
const { getToken } = require('../utils/index.util');
const jwt = require('jsonwebtoken');

module.exports = async (rawToken) => {
  try {
    // if (publicOperation.includes(req.body.operationName)) {
    //     return next()
    // }
    if (!rawToken) throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');

    const token = getToken(rawToken);
    // console.log(token);
    // console.log(new Date());
    const decodedPayload = jwt.verify(token, SECRET_KEY);
    console.log('decodedPayload', decodedPayload);

    if (!decodedPayload) {
      throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
    }
    return decodedPayload;
  } catch (error) {
    throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
  }
};
