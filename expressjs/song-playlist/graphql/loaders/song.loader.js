const DataLoader = require('dataloader');
const songService = require('../../services/song.service');

exports.songLoader = new DataLoader(
  async (keys) => {
    // console.log('keys', keys);
    const result = await songService.retriveAllSong();
    const dataMap = new Map();
    result.forEach((item) => dataMap.set(String(item._id), item));
    return keys.map((key) => dataMap.get(String(key)));
  },
  {
    cacheKeyFn: (key) => key.toString(),
  }
);
