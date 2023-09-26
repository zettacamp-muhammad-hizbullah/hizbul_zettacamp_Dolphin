const songService = require('../services/song.service');

exports.storeSong = async (req, res) => {
  try {
    const reqBody = req?.body;

    const payload = {
      title: reqBody?.title,
      artist: reqBody?.artist,
      duration: reqBody?.duration,
      genre: reqBody?.genre,
    };

    const result = await songService.createOneSong(payload);
    res.json({
      success: true,
      data: result,
      message: 'song stored successfully',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getSongs = async (req, res) => {
  try {
    let perPage = req?.query?.perPage || 10;
    let page = req?.query?.page || 1;
    let artist = req?.query?.artist || null;

    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }

    const result = await songService.retriveSongs(Number(perPage), Number(page), artist);
    res.json({
      success: true,
      data: result,
      message: 'books data retrived',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

// exports.getBooksAggregate = async (req, res) => {
//   try {
//     const authorFirstName = req?.query?.author_first_name;
//     const sortBy = req?.query?.sort_by;
//     const result = await songService.retriveBooksAggregate(authorFirstName, sortBy === 'asc' ? 1 : -1);
//     res.json({
//       success: true,
//       data: result,
//       message: 'books data retrived',
//       errors: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: error?.message || 'something went wrong',
//       errors: error,
//     });
//   }
// };

// exports.getBooksAggregateFacet = async (req, res) => {
//   try {
//     const result = await songService.retriveBooksFacet();
//     res.json({
//       success: true,
//       data: result,
//       message: 'books data retrived',
//       errors: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: error?.message || 'something went wrong',
//       errors: error,
//     });
//   }
// };

// exports.getBooksAggregateGroup = async (req, res) => {
//   try {
//     const result = await songService.retriveBooksGroupByAuthor();
//     res.json({
//       success: true,
//       data: result,
//       message: 'books data retrived',
//       errors: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: error?.message || 'something went wrong',
//       errors: error,
//     });
//   }
// };

exports.getSongById = async (req, res) => {
  try {
    const songId = req?.params?.id;
    const result = await songService.retriveSongById(songId);

    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'song data retrived',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'song data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.updateSongById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const songId = req?.params?.id;

    let payload = {
      title: reqBody?.title,
      artist: reqBody?.artist,
      duration: reqBody?.duration,
      genre: reqBody?.genre,
    };
    if (reqBody?.playlist) {
      payload.playlist = reqBody?.playlist
    }

    const result = await songService.updateSong(songId, payload);

    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'song data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'song data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.deleteSongById = async (req, res) => {
  try {
    const songId = req?.params?.id;
    const result = await songService.deleteSongById(songId);
    res.json({
      success: true,
      data: result,
      message: 'song data deleted',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};
