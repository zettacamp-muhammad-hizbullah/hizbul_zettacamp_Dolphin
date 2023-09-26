const mongoose = require('mongoose');
const playlistService = require('../services/playlist.service');
const songService = require('../services/song.service');

exports.storePlaylist = async (req, res) => {
  try {
    const reqBody = req?.body;

    const payload = {
      name: reqBody?.name,
      songs: reqBody?.songs || [],
    };

    const result = await playlistService.createOnePlaylist(payload);

    res.json({
      success: true,
      data: result,
      message: 'playlist stored successfully',
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

exports.getPlaylistsRandom = async (req, res) => {
  let maxSecond = req?.query?.maxSecond || null;

  try {
    const result = await playlistService.retriveRandomPlaylists(maxSecond);
    res.json({
      success: true,
      data: result,
      message: 'playlist data retrived',
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

exports.getPlaylists = async (req, res) => {
  try {
    // const { songId } = req?.query;
    let name = req?.query?.search || null;
    let perPage = req?.query?.perPage || 10;
    let page = req?.query?.page || 1;

    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }

    let errors = null;

    const result = await playlistService.retrivePlaylists(Number(perPage), Number(page), name);
    res.json({
      success: true,
      data: result,
      message: 'playlist data retrived',
      errors: errors?.message,
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

exports.getBookShelvesAggregate = async (_, res) => {
  try {
    const result = await playlistService.retriveBookShelvesAggregate();
    res.json({
      success: true,
      data: result,
      message: 'book shelf data retrived',
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

exports.getBookShelvesElemMatch = async (req, res) => {
  try {
    const genre = req?.params?.genre;
    // let validBookId = mongoose.Types.ObjectId(bookId);
    let errors = null;

    const result = await playlistService.retriveBookShelvesElemMatch(genre);
    res.json({
      success: true,
      data: result,
      message: 'book shelf data retrived',
      errors: errors?.message,
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

exports.getBookShelvesElemMatchEmbedded = async (req, res) => {
  try {
    const genre = req?.params?.genre;
    let errors = null;

    const result = await playlistService.retriveBookShelvesElemMatchEmbedded(genre);
    res.json({
      success: true,
      data: result,
      message: 'book shelf data retrived',
      errors: errors?.message,
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

exports.getBookShelvesGenreDistinct = async (req, res) => {
  try {
    let errors = null;

    const result = await playlistService.retriveBookShelvesGenreDistinct();
    res.json({
      success: true,
      data: result,
      message: 'book shelf genre distinct data retrived',
      errors: errors?.message,
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

exports.getBookShelvesGenreDistinctEmbedded = async (req, res) => {
  try {
    let errors = null;

    const result = await playlistService.retriveBookShelvesGenreDistinctEmbedded();
    res.json({
      success: true,
      data: result,
      message: 'book shelf genre distinct data retrived',
      errors: errors?.message,
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

exports.getPlaylistById = async (req, res) => {
  try {
    const playlistId = req?.params?.id;
    const result = await playlistService.retrivePlaylistById(playlistId);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'playlist data retrived',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'playlist data not found',
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

exports.updatePlaylistById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const playlistId = req?.params?.id;

    const payload = {
      name: reqBody?.name,
      songs: reqBody?.songs || [],
    };

    const result = await playlistService.updatePlaylist(playlistId, payload);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'playlist data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'playlist data not found',
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

exports.updateBookShelfByIdArrayFilter = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookShelfId = req?.params?.id;

    const bookId = reqBody?.book_id;
    const newBookId = reqBody?.new_book_id;

    const result = await playlistService.updateBookShelfArrayFilter(bookShelfId, bookId, newBookId);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book shelf data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
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

exports.updateBookShelfByIdArrayFilterEmbedded = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookShelfId = req?.params?.id;

    const bookId = reqBody?.book_id;
    const newStock = reqBody?.new_stock;

    const result = await playlistService.updateBookShelfArrayFilterEmbedded(bookShelfId, bookId, newStock);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book shelf data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
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

exports.addSongsToPlaylistById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const playlistId = req?.params?.id;
    console.log('playlistId', playlistId);
    let errors = [];

    const payload = {
      songs: reqBody?.songs,
    };

    const songs = [];

    for (const songId of payload.songs) {
      let song = null;

      try {
        song = await songService.retriveSongById(songId);
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
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'songs data in playlist updated',
        errors: errors.length > 0 ? errors : null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'playlist data not found',
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

exports.removeSongFromPlaylistById = async (req, res) => {
  try {
    const playlistId = req?.params?.id;
    const songId = req?.params?.songId;
    let errors = [];

    const result = await playlistService.removeSong(playlistId, songId);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'songs data in playlist updated',
        errors: errors.length > 0 ? errors : null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'playlist data not found',
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

exports.deletePlaylistById = async (req, res) => {
  try {
    const playlistId = req?.params?.id;
    const result = await playlistService.deletePlaylistById(playlistId);
    res.json({
      success: true,
      data: result,
      message: 'playlist data deleted',
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
