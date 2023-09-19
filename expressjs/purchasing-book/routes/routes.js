const { purchaseBook } = require('../controllers/book-purchasing.controller');
const { storeBookShelf, getBookShelves, getBookShelfById, updateBookShelfById, deleteBookShelfById, addBooksToBookShelfById, removeBookFromBookShelfById } = require('../controllers/book-shelf.controller');
const { storeBook, getBooks, getBookById, deleteBookById, updateBookById } = require('../controllers/book.controller');
const { bookShelfCreateValidator, bookShelfUpdateValidator, bookShelfAddBookValidator } = require('../validators/book-shelf.validator');
const { bookPurchaseValidator, bookCreateValidator, bookUpdateValidator } = require('../validators/book.validator');

module.exports = (app) => {
  app.post('/books', bookCreateValidator, storeBook);
  app.get('/books', getBooks);
  app.get('/books/:id', getBookById);
  app.patch('/books/:id', bookUpdateValidator, updateBookById);
  app.delete('/books/:id', deleteBookById);
  
  app.post('/book-shelves', bookShelfCreateValidator, storeBookShelf);
  app.get('/book-shelves', getBookShelves);
  app.get('/book-shelves/:id', getBookShelfById);
  app.patch('/book-shelves/:id', bookShelfUpdateValidator, updateBookShelfById);
  app.delete('/book-shelves/:id', deleteBookShelfById);
  app.patch('/book-shelves/:id/add-books', bookShelfAddBookValidator, addBooksToBookShelfById);
  app.patch('/book-shelves/:id/remove-books/:bookId', removeBookFromBookShelfById);

  app.post('/book-purchasing', bookPurchaseValidator, purchaseBook);

  app.all('*', function (req, res) {
    res.status(404).json({
      success: false,
      data: null,
      message: 'route not found',
      errors: null,
    });
  });
};
