const moment = require('moment/moment');
const { graphQlAuthMiddleware } = require('../middlewares/auth.middleware');
const playlistService = require('../services/playlist.service');
const songService = require('../services/song.service');
const { ApolloError } = require('apollo-server-express');
const { generateDurationDateTime } = require('../utils/index.util');

const formatDateTime = 'dddd, DD MMMM YYYY HH:mm:ss';

exports.storePlaylist = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
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
  graphQlAuthMiddleware(parent, args, ctx, info);
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
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const result = await playlistService.retriveAllPlaylist();
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylistById = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
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
  graphQlAuthMiddleware(parent, args, ctx, info);
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
  graphQlAuthMiddleware(parent, args, ctx, info);
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
  graphQlAuthMiddleware(parent, args, ctx, info);
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
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const playlistId = args?.playlist_id;
    const result = await playlistService.deletePlaylistById(playlistId);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylistRandomWithDuration = async (parent, args, ctx, info) => {
  let currentDate = moment().locale('id');
  let finishedDate = currentDate.clone();
  const currentDateFormat = currentDate.format(formatDateTime);
  let maxSecond = args?.maxSecond || 3600;

  try {
    const result = await playlistService.retriveRandomPlaylists(maxSecond);
    let totalDuration = 0;
    await result.map((song) => {
      totalDuration += song.duration;
    });

    const { total_duration, finished_at } = await generateDurationDateTime(finishedDate, totalDuration, formatDateTime);

    return {
      playlist_name: 'random',
      songs: result,
      total_duration: total_duration,
      start_at: currentDateFormat,
      end_at: finished_at,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylistsByGenreWithDuration = async (parent, args, ctx, info) => {
  let currentDate = moment().locale('id');
  let finishedDate = currentDate.clone();
  const currentDateFormat = currentDate.format(formatDateTime);

  try {
    const songs = await playlistService.groupSongByGenre();

    let result = [];

    if (songs && songs.length > 0) {
      for (let i = 0; i < songs.length; i++) {
        let totalDuration = 0;
        if (songs[i].songs && songs[i].songs.length > 0) {
          await songs[i].songs.map((subSong) => {
            totalDuration += subSong.duration;
          });
        }
        // console.log("totalDuration", totalDuration);

        const { total_duration, finished_at } = await generateDurationDateTime(finishedDate, totalDuration, formatDateTime);

        result.push({
          playlist_name: songs[i]._id,
          songs: songs[i].songs,
          total_duration: total_duration,
          start_at: currentDateFormat,
          end_at: finished_at,
        });
      }
    }

    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getPlaylistsByArtistWithDuration = async (parent, args, ctx, info) => {
  let currentDate = moment().locale('id');
  let finishedDate = currentDate.clone();
  const currentDateFormat = currentDate.format(formatDateTime);

  try {
    const songs = await playlistService.groupSongByArtist();

    let result = [];
    if (songs && songs.length > 0) {
      for (let i = 0; i < songs.length; i++) {
        let totalDuration = 0;
        if (songs[i].songs && songs[i].songs.length > 0) {
          await songs[i].songs.map((subSong) => {
            totalDuration += subSong.duration;
          });
        }

        const { total_duration, finished_at } = await generateDurationDateTime(finishedDate, totalDuration, formatDateTime);

        result.push({
          playlist_name: songs[i]._id,
          songs: songs[i].songs,
          total_duration: total_duration,
          start_at: currentDateFormat,
          end_at: finished_at,
        });
      }
    }

    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getOnePlaylistWithDuration = async (parent, args, ctx, info) => {
  let currentDate = moment().locale('id');
  let finishedDate = currentDate.clone();
  const currentDateFormat = currentDate.format(formatDateTime);
  let playlistId = args?.playlist_id || null;

  try {
    const result = await playlistService.retrivePlaylistByIdWithSongs(playlistId);

    let totalDuration = 0;
    if (result.songs && result.songs.length > 0) {
      await result.songs.map((song) => {
        totalDuration += song.duration;
      });
    }

    const { total_duration, finished_at } = await generateDurationDateTime(finishedDate, totalDuration, formatDateTime);

    return {
      playlist_name: result.name,
      songs: result.songs,
      total_duration: total_duration,
      start_at: currentDateFormat,
      end_at: finished_at,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getAllPlaylistWithDuration = async (parent, args, ctx, info) => {
  let currentDate = moment().locale('id');
  let finishedDate = currentDate.clone();
  const currentDateFormat = currentDate.format(formatDateTime);

  try {
    const playlists = await playlistService.retriveAllPlaylistSongs();

    let result = [];
    if (playlists && playlists.length > 0) {
      result = await playlists.map(async (playlist) => {
        let totalDuration = 0;
        if (playlist.songs && playlist.songs.length > 0) {
          await playlist.songs.map((song) => {
            totalDuration += song.duration;
          });
        }

        const { total_duration, finished_at } = await generateDurationDateTime(finishedDate, totalDuration, formatDateTime);

        return {
          playlist_name: playlist.name,
          songs: playlist.songs,
          total_duration: total_duration,
          start_at: currentDateFormat,
          end_at: finished_at,
        };
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};
