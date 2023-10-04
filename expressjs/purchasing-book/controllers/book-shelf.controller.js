const mongoose = require('mongoose');
const bookShelfService = require('../services/book-shelf.service');
const bookService = require('../services/book.service');
const { bookShelfCreateValidator, bookShelfUpdateValidator, bookShelfAddBookValidator } = require('../validators/book-shelf.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const { ApolloError } = require('apollo-server-express');
const model = require('../models/index.model');

exports.storeBookShelf = async (parent, args, context, info) => {
  await authMiddleware(parent, args, context, info);
  await bookShelfCreateValidator(args);

  // const hahai = 'haha';

  try {
    const reqBody = args.book_shelf_request || null;

    let payload = {
      name: reqBody.name,
    };

    const bookIds = [];

    // sanity check
    if (reqBody && reqBody.book_ids && reqBody.book_ids.length > 0) {
      for (let i = 0; i < reqBody.book_ids.length; i++) {
        console.log('mongoose.Types.ObjectId(reqBody?.book_ids[i]', mongoose.Types.ObjectId(reqBody.book_ids[i]));
        if (mongoose.Types.ObjectId(reqBody.book_ids[i])) {
          const book = await bookService.retriveBookById(reqBody.book_ids[i]);
          if (book) {
            bookIds.push(book._id);
          }
        }
      }
    }

    payload.book_ids = bookIds;

    const result = await bookShelfService.createOneBookShelf(payload);

    // sanity check
    if (bookIds && bookIds.length > 0) {
      for (let i = 0; i < bookIds.length; i++) {
        await await model.book.findOneAndUpdate(
          { _id: bookIds[i] },
          {
            book_shelf_id: result._id,
          }
        );
      }
    }
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.getBookShelves = async (parent, args, context, info) => {
  await authMiddleware(parent, args, context, info);
  try {
    const { book_id } = args;
    let validatedBookId = null;

    if (book_id) {
      try {
        validatedBookId = mongoose.Types.ObjectId(book_id);
      } catch (error) {
        validatedBookId = null;
      }
    }

    const result = await bookShelfService.retriveBookShelves(validatedBookId);
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.getBookShelfById = async (parent, args, context, info) => {
  await authMiddleware(parent, args, context, info);
  try {
    const bookShelfId = args.book_shelf_id;
    const result = await bookShelfService.retriveBookShelfById(bookShelfId);
    // aku = "ada apa"
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.updateBookShelfById = async (parent, args, context, info) => {
  await authMiddleware(parent, args, context, info);
  await bookShelfUpdateValidator(args);
  try {
    const reqBody = args.book_shelf_request;
    const bookShelfId = args.book_shelf_id;
    let payload = {
      name: reqBody.name,
    };
    const bookIds = [];

    // sanity check
    if (reqBody.book_ids && reqBody.book_ids.length > 0) {
      for (let i = 0; i < reqBody.book_ids.length; i++) {
        console.log('mongoose.Types.ObjectId(reqBody?.book_ids[i]', mongoose.Types.ObjectId(reqBody.book_ids[i]));
        if (mongoose.Types.ObjectId(reqBody.book_ids[i])) {
          const book = await bookService.retriveBookById(reqBody.book_ids[i]);
          if (book) {
            bookIds.push(book._id);
          }
        }
      }
    }
    payload.book_ids = bookIds;
    const result = await bookShelfService.updateBookShelf(bookShelfId, payload);

    if (bookIds && bookIds.length > 0) {
      for (let i = 0; i < bookIds.length; i++) {
        await await model.book.findOneAndUpdate(
          { _id: bookIds[i] },
          {
            book_shelf_id: result._id,
          }
        );
      }
    }

    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.addBooksToBookShelfById = async (parent, args) => {
  await bookShelfAddBookValidator(args);
  try {
    const reqBody = args;
    const bookShelfId = args.book_shelf_id;
    let errors = [];

    const payload = {
      book_ids: reqBody.book_ids,
    };

    const bookIds = [];

    for (const bookId of payload.book_ids) {
      let validBookId = null;
      let book = null;

      try {
        validBookId = mongoose.Types.ObjectId(bookId);
        book = await bookService.retriveBookById(validBookId);
      } catch (error) {
        book = null;
        validBookId = null;
      }

      if (book) {
        bookIds.push(validBookId);
      } else {
        errors.push(`${bookId} ignored, because not valid book id`);
        throw new ApolloError(errors);
      }
    }

    const result = await bookShelfService.addBooks(bookShelfId, bookIds);
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.deleteBookShelfById = async (parent, args, context, info) => {
  await authMiddleware(parent, args, context, info);
  try {
    const bookShelfId = args.book_shelf_id;
    const result = await bookShelfService.deleteBookShelfById(bookShelfId);
    return result;
  } catch (error) {
    throw new ApolloError(error);
  }
};
