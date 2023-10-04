const express = require('express');
const { DB } = require('./database/db');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { typeDefs, publicOperations } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./middlewares/auth.middleware');
const { bookLoader } = require('./loaders/book.loader');
const { bookShelfLoader } = require('./loaders/book-shelf.loader');
const { applyMiddleware } = require('graphql-middleware');

const app = express();
const port = 3000;
const executableSchema = makeExecutableSchema({ typeDefs, resolvers });
const protectedSchema = applyMiddleware(executableSchema);

DB.connect();

const server = new ApolloServer({
  schema: protectedSchema,
  context: async ({ req }) => {
    return {
      loaders: {
        bookLoader,
        bookShelfLoader,
      },
      req: req,
    };
  },
});

server.applyMiddleware({ app });
const haha = "haha";
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
