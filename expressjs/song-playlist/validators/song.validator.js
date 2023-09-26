const mongoose = require('mongoose');

exports.songCreateValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.title) {
    errors.push('title is required');
  }
  if (!reqBody?.artist) {
    errors.push('artist is required');
  }
  if (!reqBody?.duration) {
    errors.push('duration is required');
  }
  if (!reqBody?.genre) {
    errors.push('genre is required in array at least 1 genre');
  } else {
    if (reqBody?.genre) {
      if (!Array.isArray(reqBody?.genre)) {
        errors.push('genre must be an array of string');
      } else {
        if (reqBody?.genre?.length < 1) {
          errors.push("genre can't be empty");
        } else {
          for (let i = 0; i < reqBody?.genre?.length; i++) {
            if (typeof reqBody?.genre[i] !== 'string') {
              errors.push('genre, all item in genre array must be string');
              break;
            }
          }
        }
      }
    }
  }

  if (isNaN(reqBody?.duration)) {
    errors.push('duration must be number');
  }
  if (reqBody?.duration < 1) {
    errors.push('duration must be greater then 0');
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

exports.songUpdateValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.title) {
    errors.push('title is required');
  }
  if (!reqBody?.artist) {
    errors.push('artist is required');
  }
  if (!reqBody?.duration) {
    errors.push('duration is required');
  }
  if (!reqBody?.genre) {
    errors.push('genre is required');
  }

  if (isNaN(reqBody?.duration)) {
    errors.push('duration must be number');
  }
  if (reqBody?.duration < 1) {
    errors.push('duration must be greater then 0');
  }

  // if (typeof reqBody?.genre !== Array) {
  //   errors.push('genre must be an array');
  // }
  if (reqBody?.genre?.lenght < 1) {
    errors.push('genre item must be greater then 0');
  }
  if (reqBody?.playlist) {
    if (!mongoose.Types.ObjectId.isValid(reqBody?.playlist)) {
      errors.push('playlist must be ObjectId format');
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
