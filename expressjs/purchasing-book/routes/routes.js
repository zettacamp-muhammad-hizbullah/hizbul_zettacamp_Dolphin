const { purchaseBook } = require('../controllers/book-purchasing.controller');
const { storeBook, getBooks, getBookById, deleteBookById, updateBookById } = require('../controllers/book.controller');
const { bookPurchaseValidator, bookCreateValidator, bookUpdateValidator } = require('../validators/book.validator');

module.exports = (app) => {
  app.post('/books', bookCreateValidator, storeBook);
  app.get('/books', getBooks);
  app.get('/books/:id', getBookById);
  app.patch('/books/:id', bookUpdateValidator, updateBookById);
  app.delete('/books/:id', deleteBookById);

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
