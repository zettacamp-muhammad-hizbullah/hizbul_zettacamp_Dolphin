const DataLoader = require('dataloader');
const bookShelfService = require('../services/book-shelf.service');

exports.bookShelfLoader = new DataLoader(async (keys) => {
//   console.log('keys', keys);
  const result = await bookShelfService.retriveAllBookShelves();
  const dataMap = new Map();
  result.forEach((item) => dataMap.set(String(item._id), item));
  return keys.map((key) => dataMap.get(String(key)));
});
