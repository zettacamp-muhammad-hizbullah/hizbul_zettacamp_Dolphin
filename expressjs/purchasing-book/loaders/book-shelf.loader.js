const DataLoader = require('dataloader');
const model = require('../models/index.model');

exports.bookShelfLoader = new DataLoader(async (keys) => {
  const result = await model.bookShelf.find({ _id: { $in: keys } });
  const dataMap = new Map();
  result.forEach((item) => dataMap.set(String(item._id), item));
  return keys.map((key) => dataMap.get(String(key)));
});
