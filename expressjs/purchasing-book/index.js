const express = require('express');
// const router = require('./routes/routes');
const { DB } = require('./database/db');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
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
  context: (req) => ({
    req: req.req,
  }),
});

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
