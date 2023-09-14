const songService = require('../services/song.service');

exports.groupByArtist = async (_, res) => {
  const result = await songService.groupSongByArtist();

  res.json({
    success: true,
    data: result,
    message: 'data retrived',
    errors: null,
  });
};

exports.groupByGenre = async (_, res) => {
  const result = await songService.groupSongByGenre();

  res.json({
    success: true,
    data: result,
    message: 'data retrived',
    errors: null,
  });
};

exports.randomMaxOneHour = async (_, res) => {
  const result = await songService.groupSongByDuration();

  console.log('result =>>', result);

  res.json({
    success: true,
    data: result,
    message: 'data retrived',
    errors: null,
  });
};
