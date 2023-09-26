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
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retrivePlaylists = async (limit, skip, name) => {
  let skipData = (skip - 1) * limit;
  let result = [];

  try {
    const paginatedPipeline = [];
    const filterMatch = {
      $match: {
        name: { $regex: name, $options: 'i' },
      },
    };
    if (name) {
      paginatedPipeline.push(filterMatch);
    }

    paginatedPipeline.push({
      $skip: skipData,
    });
    paginatedPipeline.push({
      $limit: limit,
    });
    paginatedPipeline.push({
      $sort: {
        name: 1,
      },
    });
    paginatedPipeline.push({
      $lookup: {
        from: 'songs',
        localField: 'songs',
        foreignField: '_id',
        as: 'songs',
      },
    });

    result = await Model.playlist.aggregate([
      {
        $facet: {
          paginated_playlist: paginatedPipeline,
          meta_data: [
            {
              $group: {
                _id: null,
                total_playlists: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesAggregate = async () => {
  let result = [];
  try {
    result = await Model.playlist.aggregate([
      {
        $project: {
          embedded_books: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      // {
      //   $unwind: '$books',
      // },
      {
        $lookup: {
          from: 'books',
          localField: 'books',
          foreignField: '_id',
          as: 'books_data',
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesGenreDistinct = async () => {
  let result = [];
  try {
    result = await Model.playlist
      .find()
      .populate('books')
      .exec(function (err, bookShelf) {});

    // result = await Model.playlist.find().populate('books').distinct('books.genre');
    // result = await Model.playlist
    //   .find({}, function(err, result) {
    //     console.log(result);
    //   })
    // .distinct('books', function(err, book) {

    //   console.log(book);
    // });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesGenreDistinctEmbedded = async () => {
  let result = [];
  try {
    result = await Model.playlist.find().distinct('embedded_books.genre');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesElemMatch = async (value) => {
  let result = [];
  try {
    result = await Model.playlist
      .find()
      .select(['-embedded_books'])
      .populate({
        path: 'books',
        match: {
          genre: {
            $elemMatch: {
              $eq: value,
            },
          },
        },
      });

    // result = await Model.playlist
    //   .find({
    //     books: {
    //       $elemMatch: {
    //         $in: value,
    //       },
    //     },
    //   })
    //   .populate('books');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesElemMatchEmbedded = async (value) => {
  let result = [];
  try {
    result = await Model.playlist
      .find({
        embedded_books: {
          $elemMatch: {
            genre: 'story',
            price: 143000,
          },
        },
      })
      .select(['-books']);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retrivePlaylistById = async (playlistId) => {
  let result = null;
  try {
    result = await Model.playlist.findOne({ _id: playlistId }).populate('songs');
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

    if (payload?.songs && payload?.songs?.length > 0) {
      for (let i = 0; i < payload?.songs?.length; i++) {
        await Model.song.findOneAndUpdate(
          { _id: payload?.songs[i] },
          {
            playlist: result?.id,
          }
        );
        await Model.playlist.updateMany(
          { _id: { $eq: result?._id } },
          {
            $pull: {
              songs: payload?.songs[i],
            },
          }
        );
      }
    }

    // remove this playlist from each songs
    if (result?.songs && result?.songs?.length > 0) {
      for (let i = 0; i < result?.songs?.length; i++) {
        await songService.updateSong(
          payload?.songs[i],
          {
            playlist: null,
          },
          {
            new: false,
          }
        );
      }
    }
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
    // result = await Model.book.deleteOne({ _id: playlistId });
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

    // if (result && result?.songs?.length > 0) {
    //   await Model.song.updateOne(
    //     { playlist: result?._id },
    //     {
    //       playlist: null,
    //     }
    //   );
    // }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};
