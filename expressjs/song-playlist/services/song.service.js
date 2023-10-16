const { ApolloError } = require('apollo-server-express');
const Model = require('../models/index.model');
const moment = require('moment');

exports.createOneSong = async (payload) => {
  let result = null;
  try {
    result = await Model.song.create(payload);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveSongs = async (limit, skip) => {
  let skipData = (skip - 1) * limit;
  let result = [];

  try {
    result = await Model.song.find().limit(limit).skip(skipData);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveAllSong = async () => {
  let result = [];

  try {
    result = await Model.song.find();
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooksGroupByAuthor = async () => {
  let result = [];
  try {
    result = await Model.song.aggregate([
      {
        $group: {
          _id: '$author',
          books: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooksFacet = async () => {
  let result = [];
  try {
    result = await Model.song.aggregate([
      {
        $facet: {
          group_by_author: [
            {
              $group: {
                _id: '$author',
                books: {
                  $push: '$$ROOT',
                },
              },
            },
          ],
          group_by_price: [
            {
              $group: {
                _id: '$price',
                books: { $push: '$$ROOT' },
              },
            },
          ],
        },
      },
      // {
      //   $sort: {
      //     price: sortBy,
      //   },
      // },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooksAggregate = async (authorFirstName = 'Hasanudin', sortBy = 1) => {
  let result = [];
  try {
    result = await Model.song.aggregate([
      {
        $match: {
          'author.first_name': authorFirstName,
        },
      },
      {
        $sort: {
          price: sortBy,
        },
      },
      {
        $project: {
          title: 1,
          price: 1,
          author: {
            first_name: 1,
            last_name: 1,
            full_name: {
              $concat: ['$author.first_name', ' ', '$author.last_name'],
            },
          },
        },
      },
      {
        $addFields: {
          discount: 10000,
        },
      },
      {
        $addFields: {
          price_after_discount: {
            $subtract: ['$price', '$discount'],
          },
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveSongById = async (bookId) => {
  let result = null;
  try {
    result = await Model.song.findOne({ _id: bookId });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.updateSong = async (songId, payload, options) => {
  let result = null;
  try {
    result = await Model.song.findOneAndUpdate({ _id: songId }, payload, {
      new: true,
      runValidators: true,
      ...options,
    });
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.resetStatusPlayAllSong = async () => {
  let result = null;
  try {
    result = await Model.song.updateMany(
      {},
      {
        is_played: false,
      }
    );
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.deleteSongById = async (songId) => {
  let result = null;
  try {
    // result = await Model.song.deleteOne({ _id: songId });
    result = await Model.song.findOneAndDelete({ _id: songId });
    if (!result) {
      throw new Error('no data to delete');
    }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.playSong = async () => {
  let result = null;
  try {
    console.log('run at', moment().toISOString());
    result = await Model.song
      .findOneAndUpdate(
        {
          is_played: {
            $ne: true,
          },
        },
        {
          is_played: true,
        },
        {
          new: true,
        }
      )
      .sort({ title: 1 });

    if (result) {
      console.log('playing song => ', result);
      console.table([{ title: result.title, artist: result.artist, duration: result.duration, played_at: result.updatedAt }]);
      return result;
    } else {
      console.log('All song already played');
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};
