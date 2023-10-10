const DataLoader = require('dataloader');
const playlistService = require('../../services/playlist.service');
const Model = require('../../models/index.model');

exports.playlistLoader = new DataLoader(
  async (keys) => {
    // console.log('keys', keys);
    // const result = await playlistService.retriveAllPlaylist();
    const result = await Model.playlist.find({
      _id: {
        $in: keys,
      },
    });
    const dataMap = new Map();
    result.forEach((item) => dataMap.set(String(item._id), item));
    // console.log('dataMap', dataMap);
    return keys.map((key) => dataMap.get(String(key)));
  },
  {
    cacheKeyFn: (key) => key.toString(),
  }
);
