const {
  storePlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylistById,
  deletePlaylistById,
  removeSongFromPlaylistById,
  addSongsToPlaylistById,
  getPlaylistsRandom,
} = require('../controllers/playlist.controller');
const { playlistCreateValidator, playlistUpdateValidator, playlistAddSongValidator } = require('../validators/playlist.validator');

module.exports = (app) => {
  app.post('/playlists', playlistCreateValidator, storePlaylist);
  app.get('/playlists', getPlaylists);
  app.get('/playlists-random', getPlaylistsRandom);
  app.get('/playlists/:id', getPlaylistById);
  app.patch('/playlists/:id', playlistUpdateValidator, updatePlaylistById);
  app.delete('/playlists/:id', deletePlaylistById);
  app.patch('/playlists/:id/add-songs', playlistAddSongValidator, addSongsToPlaylistById);
  app.patch('/playlists/:id/remove-song/:songId', removeSongFromPlaylistById);
};
