const { ApolloError } = require('apollo-server-express');
const { SECRET_KEY } = require('../config/app.config');
const { publicOperation } = require('../graphql/typeDefs');
const { getToken } = require('../utils/index.util');
const jwt = require('jsonwebtoken');

// const authMiddleware = async (resolve, root, args, ctx, info) => {
//   try {
//     console.log(ctx);
//     const rawToken = ctx?.req?.headers?.authorization || '';
//     // if (publicOperation.includes(req.body.operationName)) {
//     //     return next()
//     // }
//     if (!rawToken) throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');

//     const token = getToken(rawToken);
//     // console.log(token);
//     // console.log(new Date());
//     const decodedPayload = jwt.verify(token, SECRET_KEY);
//     // console.log('decodedPayload', decodedPayload);

//     if (!decodedPayload) {
//       throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
//     }
//     ctx.user = decodedPayload;
//     return resolve(root, args, ctx, info);
//   } catch (error) {
//     console.log(error);
//     throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
//   }
// };

// module.exports = (queries, mutations) => {
//   return {
//     Query: () => {
//       const result = queries.reduce((array, current) => {
//         array[current] = authMiddleware;
//         return array;
//       }, {});
//       console.log('Query middleware', result);
//       return result;
//     },
//     Mutation: () => {
//       const result = mutations.reduce((array, current) => {
//         array[current] = authMiddleware;
//         return array;
//       }, {});
//       console.log('Mutation middleware', result);
//       return result;
//     },
//   };
// };

module.exports = (parent, args, ctx, info) => {
  try {
    const rawToken = ctx.req.headers.authorization || '';
    if (!rawToken) throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');

    const token = getToken(rawToken);
    const decodedPayload = jwt.verify(token, SECRET_KEY);

    if (!decodedPayload) {
      throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
    }
    ctx.user = decodedPayload;
  } catch (error) {
    console.log(error);
    throw new ApolloError('unauthenticated', 'UN_AUTHENTICATED');
  }
};
