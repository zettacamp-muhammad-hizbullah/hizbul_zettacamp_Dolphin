const express = require('express');
const { DB } = require('./database/db');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { playlistLoader } = require('./graphql/loaders/playlist.loader');
const { songLoader } = require('./graphql/loaders/song.loader');
const { userLoader } = require('./graphql/loaders/user.loader');
const { applyMiddleware } = require('graphql-middleware');
const webhookController = require('./controllers/webhook.controller');
const { restAuthMiddleware } = require('./middlewares/auth.middleware');

const app = express();
const port = 4000;
app.use(express.json());
const schema = makeExecutableSchema({ typeDefs, resolvers });
const protectedSchema = applyMiddleware(schema);

DB.connect();

const server = new ApolloServer({
  schema: protectedSchema,
  context: async ({ req }) => {
    return {
      loaders: {
        userLoader,
        songLoader,
        playlistLoader,
      },
      req: req,
    };
  },
});

server.applyMiddleware({ app });

app.post('/update-song', restAuthMiddleware, webhookController.updateSongWebhook);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
