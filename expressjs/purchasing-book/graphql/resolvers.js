// const bookShelfController = require('../controllers/book-shelf.controller');
const authController = require('../controllers/auth.controller');
const bookController = require('../controllers/book.controller');
const bookShelfController = require('../controllers/book-shelf.controller');
const bookPurchaseController = require('../controllers/book-purchasing.controller');
// const bookService = require('../services/book.service');
// const bookShelfService = require('../services/book-shelf.service');

const book_shelf = async (book, args, context) => {
  try {
    const result = await context.loaders.bookShelfLoader.load(book.book_shelf_id);
    return result;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

const books = async (bookShelf, args, context) => {
  // console.log('parent', bookShelf);
  try {
    const result = await context.loaders.bookLoader.loadMany(bookShelf.book_ids);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  Mutation: {
    // AUTH
    login: authController.login,

    // BOOK
    purchaseBook: bookPurchaseController.purchaseBook,
    updateBookById: bookController.updateBookById,
    createBook: bookController.storeBook,
    deleteBookById: bookController.deleteBookById,

    // BOOK SHELF
    updateBookShelfById: bookShelfController.updateBookShelfById,
    createBookShelf: bookShelfController.storeBookShelf,
    deleteBookShelf: bookShelfController.deleteBookShelfById,
  },
  Query: {
    // BOOK
    getAllBooks: bookController.getAllBooks,
    getOneBook: bookController.getBookById,

    // BOOK SHELF
    getOneBookShelf: bookShelfController.getBookShelfById,
    getAllBookShelves: bookShelfController.getBookShelves,
  },
  Book: {
    book_shelf,
  },
  BookShelf: {
    books,
  },
};
