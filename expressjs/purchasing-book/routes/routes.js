const { asyncAwaitFunction, asyncNotAwaitFunction } = require('../controllers/async-function.controller');
const { purchaseBook } = require('../controllers/book.controller');
const adminMiddleware = require('../middlewares/admin.middleware');
const { bookPurchaseValidator } = require('../validators/book.validator');

module.exports = (app) => {
  app.use(adminMiddleware);
  app.post('/books', bookPurchaseValidator, purchaseBook);
  app.get('/async-await', asyncAwaitFunction);
  app.get('/async-not-await', asyncNotAwaitFunction);
  app.all('*', function (req, res) {
    res.status(404).json({
      success: false,
      data: null,
      message: 'route not found',
      errors: null,
    });
  });
};
