const { ApolloError } = require('apollo-server-express');
const songService = require('../services/song.service');
const { graphQlAuthMiddleware } = require('../middlewares/auth.middleware');
const { playSongCron } = require('../cron/run-song.cron');

exports.storeSong = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const reqBody = args?.input;

    const payload = {
      title: reqBody?.title,
      artist: reqBody?.artist,
      duration: reqBody?.duration,
      genre: reqBody?.genre,
    };

    const result = await songService.createOneSong(payload);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.getSongs = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    let perPage = args?.perPage || 10;
    let page = args?.page || 1;

    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }

    const result = await songService.retriveSongs(Number(perPage), Number(page));
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL_SERVER_ERROR');
  }
};

exports.getAllSong = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const result = await songService.retriveAllSong();
    // const result = await ctx.loaders.songLoader.loadMany()
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL_SERVER_ERROR');
  }
};

exports.getSongById = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const songId = args?.song_id;
    console.log(ctx.loaders);
    const result = ctx.loaders.songLoader.load(songId);
    return result;
  } catch (error) {
    console.log(error);
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.updateSongById = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const reqBody = args?.input;
    const songId = args?.song_id;

    let payload = {
      title: reqBody?.title,
      artist: reqBody?.artist,
      duration: reqBody?.duration,
      genre: reqBody?.genre,
    };
    if (reqBody?.playlist) {
      payload.playlist = reqBody?.playlist;
    }

    const result = await songService.updateSong(songId, payload);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.deleteSongById = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const songId = args?.song_id;
    const result = await songService.deleteSongById(songId);
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.resetIsPlayedStatusAllSong = async (parent, args, ctx, info) => {
  try {
    // await songService.playSong();
    const result = await songService.resetStatusPlayAllSong();
    return true;
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
};

exports.playSongTriggerManual = async (parent, args, ctx, info) => {
  try {
    const cronName = args.cron_name || null
    if (cronName === 'play_song') {
      songService.playSong()
      // playSongCron.fireOnTick()
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new ApolloError('INTERNAL SERVER ERROR');
  }
}
