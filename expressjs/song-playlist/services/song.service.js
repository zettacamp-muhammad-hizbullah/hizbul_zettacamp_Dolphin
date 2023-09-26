const Model = require('../models/index.model');

exports.createOneSong = async (payload) => {
  let result = null;
  try {
    result = await Model.song.create(payload);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveSongs = async (limit, skip, artist) => {
  let skipData = (skip - 1) * limit;
  let result = [];

  try {
    // result = await Model.song.find();
    const paginatedPipeline = [];
    const matchArtist = {
      $match: {
        artist: { $eq: artist },
      },
    };
    if (artist) {
      console.log('artist', artist);
      paginatedPipeline.push(matchArtist);
    }
    paginatedPipeline.push({
      $skip: skipData,
    });
    paginatedPipeline.push({
      $limit: limit,
    });
    paginatedPipeline.push({
      $lookup: {
        from: 'playlists',
        localField: 'playlist',
        foreignField: '_id',
        as: 'playlist',
      },
    });

    // console.log('paginatedPipeline', paginatedPipeline);

    result = await Model.song.aggregate([
      {
        $facet: {
          paginated_song: paginatedPipeline,
          meta_data: [
            ...paginatedPipeline,
            {
              $group: {
                _id: null,
                total_songs: { $sum: 1 },
              },
            },
          ],
          group_by_artist: [
            ...paginatedPipeline,
            {
              $group: {
                _id: '$artist',
                songs: { $push: '$$ROOT' },
              },
            },
            {
              $sort: {
                _id: 1,
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
  } catch (error) {
    throw new Error(error);
  }

  return result;
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
