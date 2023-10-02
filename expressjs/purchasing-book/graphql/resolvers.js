// const bookShelfController = require('../controllers/book-shelf.controller');
const authController = require('../controllers/auth.controller');
const bookController = require('../controllers/book.controller');
const bookPurchaseController = require('../controllers/book-purchasing.controller');
const bookService = require('../services/book.service');
const bookShelfService = require('../services/book-shelf.service');

const book_shelf = async (book, {}, ctx) => {
  try {
    const result = await ctx.loaders.bookShelfLoader.load(book?.book_shelf_id);
    console.log('result', result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const books = async (bookShelf, {}, ctx) => {
  console.log('parent', bookShelf);
  console.log('parent book_ids', bookShelf.book_ids );
  try {
    const result = await ctx.loaders.bookLoader.loadMany(bookShelf?.book_ids);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  Mutation: {
    login: (_, args) => {
      return authController.login({ body: args });
    },
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
    getBook: (_, { bookId }, ctx) => {
      console.log('ctx', ctx);
      const result = bookController.getBookById({ params: { id: bookId } });
      return result;
      // // using loader
      // return bookLoader.getBookByIdLoader.load(bookId);
    },
    getBookShelf: (_, { bookShelfId }) => {
      return bookShelfService.retriveBookShelfById(bookShelfId);
    },
    getBookShelves: (_, {}) => {
      return bookShelfService.retriveAllBookShelves();
    },
  },
  Book: {
    book_shelf,
  },
  BookShelf: {
    books,
  },
};
