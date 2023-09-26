const songRoute = require('./song.route');
const playlistRoute = require('./playlist.route');

module.exports = (app) => {
  songRoute(app);
  playlistRoute(app);

  app.all('*', function (req, res) {
    res.status(404).json({
      success: false,
      data: null,
      message: 'route not found',
      errors: null,
    });
  });
};
