const { storeBook, getBooks, getBooksAggregate, getBookById, updateBookById, getBooksAggregateFacet, getBooksAggregateGroup } = require("../controllers/book.controller");
const { deleteBookById } = require("../services/book.service");
const { bookCreateValidator, bookUpdateValidator } = require("../validators/book.validator");

module.exports = (app) => {
  app.post('/books', bookCreateValidator, storeBook);
  app.get('/books', getBooks);
  app.get('/books-facet', getBooksAggregateFacet);
  app.get('/books-group', getBooksAggregateGroup);
  app.get('/books-aggregate', getBooksAggregate);
  app.get('/books/:id', getBookById);
  app.patch('/books/:id', bookUpdateValidator, updateBookById);
  app.delete('/books/:id', deleteBookById);
};
