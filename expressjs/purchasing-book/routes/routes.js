const bookRoute = require('./book.route');
const bookShelfRoute = require('./book-shelf.route');
const { purchaseBook } = require('../controllers/book-purchasing.controller');
const { bookPurchaseValidator } = require('../validators/book.validator');

module.exports = (app) => {
  bookRoute(app);
  bookShelfRoute(app);

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
