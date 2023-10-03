const DataLoader = require('dataloader');
const songService = require('../../services/song.service');
const Model = require('../models/index.model');

exports.songLoader = new DataLoader(
  async (keys) => {
    // console.log('keys', keys);
    // const result = await songService.retriveAllSong();
    const result = await Model.song.find({
      _id: {
        $in: keys,
      },
    });
    const dataMap = new Map();
    result.forEach((item) => dataMap.set(String(item._id), item));
    return keys.map((key) => dataMap.get(String(key)));
  },
  {
    cacheKeyFn: (key) => key.toString(),
  }
);
