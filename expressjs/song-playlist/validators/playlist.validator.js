const mongoose = require('mongoose');

exports.playlistCreateValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.name) {
    errors.push('name is required');
  }
  if (reqBody?.songs) {
    if (!Array.isArray(reqBody?.songs)) {
      errors.push('songs must be an array');
    } else {
      if (reqBody?.songs?.length < 1) {
        errors.push('songs must have at least 1 item of song id');
      } else {
        for (let i = 0; i < reqBody?.songs?.length; i++) {
          if (!mongoose.Types.ObjectId.isValid(reqBody?.songs[i])) {
            errors.push('songs, all item in songs array must be ObjectId format');
            break;
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    isPassed = false;
    res.status(400).json({
      success: false,
      data: null,
      message: 'bad request',
      errors: errors,
    });
    return;
  }

  next();
};

exports.playlistUpdateValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.name) {
    errors.push('name is required');
  }

  if (reqBody?.songs) {
    if (!Array.isArray(reqBody?.songs)) {
      errors.push('songs must be an array');
    } else {
      if (reqBody?.songs?.length < 1) {
        errors.push('songs must have at least 1 item of song id');
      } else {
        for (let i = 0; i < reqBody?.songs?.length; i++) {
          if (!mongoose.Types.ObjectId.isValid(reqBody?.songs[i])) {
            errors.push('songs, all item in songs array must be ObjectId format');
            break;
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    isPassed = false;
    res.status(400).json({
      success: false,
      data: null,
      message: 'bad request',
      errors: errors,
    });
    return;
  }

  next();
};

exports.playlistAddSongValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.songs) {
    errors.push('songs is required');
  }
  if (reqBody?.songs) {
    if (!Array.isArray(reqBody?.songs)) {
      errors.push('songs must be an array');
    } else {
      if (reqBody?.songs?.length < 1) {
        errors.push('songs must have at least 1 item of song id');
      } else {
        for (let i = 0; i < reqBody?.songs?.length; i++) {
          if (!mongoose.Types.ObjectId.isValid(reqBody?.songs[i])) {
            errors.push('songs, all item in songs array must be ObjectId format');
            break;
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    isPassed = false;
    res.status(400).json({
      success: false,
      data: null,
      message: 'bad request',
      errors: errors,
    });
    return;
  }

  next();
};
