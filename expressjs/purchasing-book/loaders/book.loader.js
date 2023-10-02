const DataLoader = require('dataloader');
const bookService = require('../services/book.service');

// exports.bookLoader = new DataLoader((bookIds) => Promise.all(bookIds.map(bookService.retriveBookById(bookIds))));
exports.bookLoader = new DataLoader(async (keys) => {
  console.log('keys', keys);
  // const result = await bookService.retriveBookById(keys);
  //   return result;
  const result = await bookService.retriveAllBooks();
  const dataMap = new Map();
  result.forEach((item) => dataMap.set(String(item._id), item));
  return keys.map((key) => dataMap.get(String(key)));
});
