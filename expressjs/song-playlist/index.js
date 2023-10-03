const express = require('express');
const { DB } = require('./database/db');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { typeDefs, publicOperations } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./middlewares/auth.middleware');
const { playlistLoader } = require('./graphql/loaders/playlist.loader');
const { songLoader } = require('./graphql/loaders/song.loader');
const { userLoader } = require('./graphql/loaders/user.loader');
const { applyMiddleware } = require('graphql-middleware');

const app = express();
const port = 4000;
const schema = makeExecutableSchema({ typeDefs, resolvers });
// const { login, register, ...protectedMutation } = resolvers.Mutation;
// console.log('Object.keys(resolvers.Query)', Object.keys(resolvers.Query));
// console.log('Object.keys(protectedMutation)', Object.keys(protectedMutation));
// const protectedSchema = applyMiddleware(schema, authMiddleware(Object.keys(resolvers.Query), Object.keys(protectedMutation)));
const protectedSchema = applyMiddleware(schema);

DB.connect();

const server = new ApolloServer({
  schema: protectedSchema,
  context: async ({ req }) => {
    // const rawToken = req.headers.authorization || '';
    // const reqOperationName = req.body.operationName;

    // console.log('reqOperationName', reqOperationName);
    // let userData = null;
    // passed public operation
    // if (publicOperations.includes(reqOperationName)) {
    //   return {
    //     user: userData,
    //     req: req,
    //   };
    // } else {
    //   userData = await authMiddleware(rawToken);
    // }

    return {
      loaders: {
        userLoader,
        songLoader,
        playlistLoader,
      },
      // user: userData,
      req: req,
    };
  },
});

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
