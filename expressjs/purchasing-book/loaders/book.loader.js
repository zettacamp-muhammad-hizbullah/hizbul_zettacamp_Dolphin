const DataLoader = require('dataloader');
const model = require('../models/index.model');

// exports.bookLoader = new DataLoader((bookIds) => Promise.all(bookIds.map(bookService.retriveBookById(bookIds))));
exports.bookLoader = new DataLoader(async (keys) => {
  const result = await model.book.find({ _id: { $in: keys } });
  const dataMap = new Map();
  result.forEach((item) => dataMap.set(String(item._id), item));
  return keys.map((key) => dataMap.get(String(key)));
});
