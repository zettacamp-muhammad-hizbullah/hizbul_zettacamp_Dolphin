const mongoose = require('mongoose');
const Model = require('../models/index.model');
const songService = require('./song.service');
const { generatePlaylist, shuffleFunction } = require('../utils/index.util');

exports.createOnePlaylist = async (payload) => {
  let result = null;
  try {
    result = await Model.playlist.create(payload);

    if (payload?.songs && payload?.songs?.length > 0) {
      for (let i = 0; i < payload?.songs?.length; i++) {
        await Model.song.updateOne(
          { _id: payload?.songs[i] },
          {
            playlist: result?._id,
          }
        );
        await Model.playlist.updateMany(
          { _id: { $ne: result?._id } },
          {
            $pull: {
              songs: payload?.songs[i],
            },
          }
        );
      }
    }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveRandomPlaylists = async (maxDuration) => {
  let result = [];

  try {
    const songs = await Model.song.find();
    const shuffledSongs = await shuffleFunction(songs);
    result = await generatePlaylist(shuffledSongs, maxDuration);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.retrivePlaylists = async (limit, skip) => {
  let skipData = (skip - 1) * limit;
  let result = [];

  try {
    result = await Model.playlist.find().skip(skipData).limit(limit);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveAllPlaylist = async () => {
  let result = [];

  try {
    result = await Model.playlist.find();
  } catch (error) {
    throw new Error(error);
  }
  return result;
};

exports.retrivePlaylistById = async (playlistId) => {
  let result = null;
  try {
    result = await Model.playlist.findOne({ _id: playlistId });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.updatePlaylist = async (playlistId, payload) => {
  let result = null;
  try {
    result = await Model.playlist.findOneAndUpdate({ _id: playlistId }, payload, {
      new: true,
      runValidators: true,
    });

    await Model.song.updateMany(
      { playlist: result?._id },
      {
        playlist: null,
      }
    );

    if (payload?.songs && payload?.songs?.length > 0) {
      for (let i = 0; i < payload?.songs?.length; i++) {
        await Model.song.findOneAndUpdate(
          { _id: payload?.songs[i] },
          {
            playlist: result?._id,
          }
        );
        // await Model.playlist.updateMany(
        //   { _id: { $eq: result?._id } },
        //   {
        //     $pull: {
        //       songs: payload?.songs[i],
        //     },
        //   }
        // );
      }
    }

    // remove this playlist from each songs
    // if (result?.songs && result?.songs?.length > 0) {
    //   for (let i = 0; i < result?.songs?.length; i++) {
    //     await songService.updateSong(
    //       payload?.songs[i],
    //       {
    //         playlist: null,
    //       },
    //       {
    //         new: false,
    //       }
    //     );
    //   }
    // }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.addSongs = async (playlistId, songs) => {
  let result = null;
  try {
    result = await Model.playlist.findOneAndUpdate(
      { _id: playlistId },
      {
        $addToSet: {
          songs: songs,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(result);
    console.log(songs);
    if (songs && songs?.length > 0) {
      for (let i = 0; i < songs.length; i++) {
        await Model.song.updateOne(
          { _id: songs[i] },
          {
            playlist: result?._id,
          }
        );

        await Model.playlist.updateMany(
          { _id: { $ne: playlistId } },
          {
            $pull: {
              songs: songs[i],
            },
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  return result;
};

exports.removeSong = async (playlistId, songId) => {
  let result = null;
  try {
    console.log('songId', songId);
    result = await Model.playlist.findOneAndUpdate(
      { _id: playlistId },
      {
        $pull: {
          songs: songId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    await songService.updateSong(songId, {
      playlist: null,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  return result;
};

exports.deletePlaylistById = async (playlistId) => {
  let result = null;
  try {
    result = await Model.playlist.findOneAndDelete({ _id: playlistId });
    await Model.song.updateMany(
      { playlist: playlistId },
      {
        playlist: null,
      }
    );
    if (!result) {
      throw new Error('no data to delete');
    }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.groupSongByGenre = async () => {
  let result = null;
  try {
    result = await Model.song.aggregate([
      {
        $unwind: '$genre',
      },
      {
        $group: {
          _id: '$genre',
          songs: {
            $push: {
              _id: "$_id",
              title: "$title",
              genre: ["$genre"],
              artist: "$artist",
              duration: "$duration",
            },            
          },
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.groupSongByArtist = async () => {
  let result = null;
  try {
    result = await Model.song.aggregate([
      {
        $group: {
          _id: '$artist',
          songs: {
            $push: '$$ROOT',
          },
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retrivePlaylistByIdWithSongs = async (playlistId) => {
  let result = null;
  try {
    result = await Model.playlist.findOne({ _id: playlistId }).populate('songs');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveAllPlaylistSongs = async () => {
  let result = null;
  try {
    result = await Model.playlist.find().populate('songs');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};
