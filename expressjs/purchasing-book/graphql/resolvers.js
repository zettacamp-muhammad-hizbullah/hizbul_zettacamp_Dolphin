// const bookShelfController = require('../controllers/book-shelf.controller');
const bookController = require('../controllers/book.controller');
const bookPurchaseController = require('../controllers/book-purchasing.controller');

module.exports = {
  Mutation: {
    purchaseBook: (_, args) => {
      return bookPurchaseController.purchaseBook({ body: args });
    },
    updateBookById: (_, args) => {
      console.log(args);
      return bookController.updateBookById({ params: { id: args.book_id }, body: args.book_request });
    },
    createBook: (_, args) => {
      return bookController.storeBook({ body: args.book_request });
    },
    deleteBookById: (_, args) => {
      return bookController.deleteBookById({ params: { id: args.book_id } });
    },
  },
  Query: {
    // BOOK
    getBooks: (parent, args, ctx, info) => {
      // console.log('parent', parent);
      // console.log('ctx', ctx);
      // console.log('info', info);
      return bookController.getBooks({ query: args });
    },
    getBook: (_, { bookId }) => {
      return bookController.getBookById({ params: { id: bookId } });
    },
  },
};
