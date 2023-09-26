const { storeSong, getSongs, getSongById, updateSongById, deleteSongById } = require('../controllers/song.controller');
const { songCreateValidator, songUpdateValidator } = require('../validators/song.validator');

module.exports = (app) => {
  app.post('/songs', songCreateValidator, storeSong);
  app.get('/songs', getSongs);
  app.get('/songs/:id', getSongById);
  app.patch('/songs/:id', songUpdateValidator, updateSongById);
  app.delete('/songs/:id', deleteSongById);
};
