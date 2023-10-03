const authMiddleware = require('../middlewares/auth.middleware');
const playlistService = require('../services/playlist.service');
const songService = require('../services/song.service');
const { ApolloError } = require('apollo-server-express');

exports.storePlaylist = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const reqBody = args?.input;

    const payload = {
      name: reqBody?.name,
      songs: reqBody?.songs || [],
    };
    const result = await playlistService.createOnePlaylist(payload);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylistsRandom = async (parent, args, ctx, info) => {
  let maxSecond = args?.maxSecond || 3600;

  try {
    const result = await playlistService.retriveRandomPlaylists(maxSecond);
    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylists = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    let name = args?.search || null;
    let perPage = args?.perPage || 10;
    let page = args?.page || 1;

    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }

    const result = await playlistService.retrivePlaylists(Number(perPage), Number(page), name);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getAllPlaylist = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const result = await playlistService.retriveAllPlaylist();
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylistById = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const playlistId = args?.playlist_id;
    // const result = await playlistService.retrivePlaylistById(playlistId);
    const result = await ctx.loaders.playlistLoader.load(playlistId);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.updatePlaylistById = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const reqBody = args?.input;
    const playlistId = args?.playlist_id;

    const payload = {
      name: reqBody?.name,
      songs: reqBody?.songs || [],
    };

    const result = await playlistService.updatePlaylist(playlistId, payload);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.addSongsToPlaylistById = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const reqBody = args?.input;
    const playlistId = args?.playlist_id;
    let errors = [];

    const payload = {
      songs: reqBody?.songs,
    };

    const songs = [];

    for (const songId of payload.songs) {
      let song = null;

      try {
        song = await ctx.loaders.songLoader.load(songId);
      } catch (error) {
        song = null;
      }

      if (song) {
        songs.push(songId);
      } else {
        errors.push(`${songId} ignored, because not valid song id`);
      }
    }

    const result = await playlistService.addSongs(playlistId, songs);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.removeSongFromPlaylistById = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const playlistId = args?.playlist_id;
    const songId = args?.song_id;

    const result = await playlistService.removeSong(playlistId, songId);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.deletePlaylistById = async (parent, args, ctx, info) => {
  authMiddleware(parent, args, ctx, info);
  try {
    const playlistId = args?.playlist_id;
    const result = await playlistService.deletePlaylistById(playlistId);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};
