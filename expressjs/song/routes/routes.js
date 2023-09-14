const { login } = require('../controllers/auth.controller');
const { groupByArtist, groupByGenre, randomMaxOneHour } = require('../controllers/song.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { loginValidator } = require('../validators/login.validator');

module.exports = (app) => {
  app.post('/login',loginValidator, login);

  app.use(authMiddleware);
  app.get('/group-by-artist', groupByArtist);
  app.get('/group-by-genre', groupByGenre);
  app.get('/random-playlist-max-one-hour', randomMaxOneHour);
  app.all('*', function (req, res) {
    res.status(404).json({
      success: false,
      data: null,
      message: 'route not found',
      errors: null,
    });
  });
};
