const express = require('express');
// const router = require('./routes/routes');
const { DB } = require('./database/db');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { typeDefs, publicOperations } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { GraphQLError } = require('graphql');
const authMiddleware = require('./middlewares/auth.middleware');
const { bookLoader } = require('./loaders/book.loader');
const { bookShelfLoader } = require('./loaders/book-shelf.loader');
// const { applyMiddleware } = require('graphql-middleware');

const app = express();
const port = 3000;
// const executableSchema = makeExecutableSchema({ typeDefs, resolvers });
// const protectedSchema = applyMiddleware(executableSchema, )
// app.use(express.json());

// router(app);

DB.connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // schema: executableSchema,
  context: async ({ req }) => {
    const rawToken = req.headers.authorization || '';
    const reqOperationName = req.body.operationName;

    console.log('reqOperationName', reqOperationName);
    let userData = null;
    // passed public operation
    if (publicOperations.includes(reqOperationName)) {
      return {
        user: userData,
        req: req,
      };
    }

    userData = await authMiddleware(rawToken);
    return {
      loaders: {
        bookLoader,
        bookShelfLoader,
      },
      user: userData,
      req: req,
    };
  },
});

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
