const {
  storeBookShelf,
  getBookShelves,
  getBookShelvesAggregate,
  getBookShelvesGenreDistinct,
  getBookShelvesGenreDistinctEmbedded,
  getBookShelvesElemMatch,
  getBookShelvesElemMatchEmbedded,
  getBookShelfById,
  updateBookShelfByIdArrayFilter,
  updateBookShelfByIdArrayFilterEmbedded,
  updateBookShelfById,
  addBooksToBookShelfById,
  removeBookFromBookShelfById,
} = require('../controllers/book-shelf.controller');
const { deleteBookShelfById } = require('../services/book-shelf.service');
const { bookShelfCreateValidator, bookShelfUpdateValidator, bookShelfAddBookValidator } = require('../validators/book-shelf.validator');

module.exports = (app) => {
  app.post('/book-shelves', bookShelfCreateValidator, storeBookShelf);
  app.get('/book-shelves', getBookShelves);
  app.get('/book-shelves-aggregate', getBookShelvesAggregate);
  app.get('/book-shelves/genre-distinct', getBookShelvesGenreDistinct);
  app.get('/book-shelves/genre-distinct-embedded', getBookShelvesGenreDistinctEmbedded);
  app.get('/book-shelves/elem-match/:genre', getBookShelvesElemMatch);
  app.get('/book-shelves/elem-match-embedded/:genre', getBookShelvesElemMatchEmbedded);
  app.get('/book-shelves/:id', getBookShelfById);
  app.patch('/book-shelves/:id/array-filter', updateBookShelfByIdArrayFilter);
  app.patch('/book-shelves/:id/array-filter-embedded', updateBookShelfByIdArrayFilterEmbedded);
  app.patch('/book-shelves/:id', bookShelfUpdateValidator, updateBookShelfById);
  app.delete('/book-shelves/:id', deleteBookShelfById);
  app.patch('/book-shelves/:id/add-books', bookShelfAddBookValidator, addBooksToBookShelfById);
  app.patch('/book-shelves/:id/remove-books/:bookId', removeBookFromBookShelfById);
};
