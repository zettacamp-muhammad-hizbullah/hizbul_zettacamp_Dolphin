const authController = require('../controllers/auth.controller');
const songController = require('../controllers/song.controller');
const playlistController = require('../controllers/playlist.controller');
const webhookController = require('../controllers/webhook.controller');
const userController = require('../controllers/user.controller');

const playlist = async (song, {}, ctx) => {
  try {
    const result = await ctx.loaders.playlistLoader.load(song?.playlist);
    return result;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

const songs = async (playlist, {}, ctx) => {
  try {    
    const result = await ctx.loaders.songLoader.loadMany(playlist?.songs);
    return result;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

module.exports = {
  Mutation: {
    register: authController.register,
    login: authController.login,

    updateSongById: songController.updateSongById,
    createSong: songController.storeSong,
    deleteSongById: songController.deleteSongById,
    resetIsPlayedStatusAllSong: songController.resetIsPlayedStatusAllSong,

    updatePlaylistById: playlistController.updatePlaylistById,
    createPlaylist: playlistController.storePlaylist,
    deletePlaylistById: playlistController.deletePlaylistById,
    addSongToPlaylist: playlistController.addSongsToPlaylistById,
    removeSongFromPlaylist: playlistController.removeSongFromPlaylistById,

    createPlaylistWebhook: webhookController.storePlaylistWebhook,
    createMultiplePlaylistWebhook: webhookController.storePlaylistWebhook,
    triggerPlaySongManual: songController.playSongTriggerManual
  },
  Query: {
    // AUTH
    me: authController.me,

    // USER
    getAllUser: userController.getAllUser,

    // SONGS
    getSongs: songController.getSongs,
    getAllSong: songController.getAllSong,
    getSong: songController.getSongById,

    // PLAYLIST
    getPlaylists: playlistController.getPlaylists,
    getAllPlaylist: playlistController.getAllPlaylist,
    getPlaylist: playlistController.getPlaylistById,    
    getPlaylistRandom: playlistController.getPlaylistsRandom,    

    getAllPlaylistWithDuration: playlistController.getAllPlaylistWithDuration,
    getOnePlaylistWithDuration: playlistController.getOnePlaylistWithDuration,
    getPlaylistsByArtistWithDuration: playlistController.getPlaylistsByArtistWithDuration,
    getPlaylistsByGenreWithDuration: playlistController.getPlaylistsByGenreWithDuration,
    getPlaylistRandomWithDuration: playlistController.getPlaylistRandomWithDuration,    
  },

  Song: {
    playlist,
  },
  Playlist: {
    songs,
  },
};
