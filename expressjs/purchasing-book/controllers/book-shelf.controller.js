const mongoose = require('mongoose');
const bookShelfService = require('../services/book-shelf.service');
const bookService = require('../services/book.service');

exports.storeBookShelf = async (req, res) => {
  try {
    const reqBody = req?.body;

    const payload = {
      name: reqBody?.name,
      books: reqBody?.books,
    };

    const result = await bookShelfService.createOneBookShelf(payload);
    res.json({
      success: true,
      data: result,
      message: 'book shelf stored successfully',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getBookShelves = async (req, res) => {
  try {
    const { bookId } = req?.query;
    let validatedBookId = null;
    let errors = null;

    if (bookId) {
      try {
        validatedBookId = mongoose.Types.ObjectId(bookId);
      } catch (error) {
        errors = error;
        validatedBookId = null;
      }
    }

    const result = await bookShelfService.retriveBookShelves(validatedBookId);
    res.json({
      success: true,
      data: result,
      message: 'book shelf data retrived',
      errors: errors?.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getBookShelvesElemMatch = async (req, res) => {
  try {
    const genre = req?.params?.genre;
    // let validBookId = mongoose.Types.ObjectId(bookId);
    let errors = null;

    const result = await bookShelfService.retriveBookShelvesElemMatch(genre);
    res.json({
      success: true,
      data: result,
      message: 'book shelf data retrived',
      errors: errors?.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getBookShelvesElemMatchEmbedded = async (req, res) => {
  try {
    const genre = req?.params?.genre;
    let errors = null;

    const result = await bookShelfService.retriveBookShelvesElemMatchEmbedded(genre);
    res.json({
      success: true,
      data: result,
      message: 'book shelf data retrived',
      errors: errors?.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getBookShelvesGenreDistinct = async (req, res) => {
  try {
    let errors = null;

    const result = await bookShelfService.retriveBookShelvesGenreDistinct();
    res.json({
      success: true,
      data: result,
      message: 'book shelf genre distinct data retrived',
      errors: errors?.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getBookShelvesGenreDistinctEmbedded = async (req, res) => {
  try {
    let errors = null;

    const result = await bookShelfService.retriveBookShelvesGenreDistinctEmbedded();
    res.json({
      success: true,
      data: result,
      message: 'book shelf genre distinct data retrived',
      errors: errors?.message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.getBookShelfById = async (req, res) => {
  try {
    const bookShelfId = req?.params?.id;
    const result = await bookShelfService.retriveBookShelfById(bookShelfId);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book shelf data retrived',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.updateBookShelfById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookShelfId = req?.params?.id;

    const payload = {
      name: reqBody?.name,
      books: reqBody?.books,
    };

    const result = await bookShelfService.updateBookShelf(bookShelfId, payload);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book shelf data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.updateBookShelfByIdArrayFilter = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookShelfId = req?.params?.id;

    const bookId = reqBody?.book_id;
    const newBookId = reqBody?.new_book_id;

    const result = await bookShelfService.updateBookShelfArrayFilter(bookShelfId, bookId, newBookId);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book shelf data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.updateBookShelfByIdArrayFilterEmbedded = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookShelfId = req?.params?.id;

    const bookId = reqBody?.book_id;
    const newStock = reqBody?.new_stock;

    const result = await bookShelfService.updateBookShelfArrayFilterEmbedded(bookShelfId, bookId, newStock);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book shelf data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.addBooksToBookShelfById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookShelfId = req?.params?.id;
    let errors = [];

    const payload = {
      books: reqBody?.books,
    };

    const books = [];

    for (const bookId of payload.books) {
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
        books.push(validBookId);
      } else {
        errors.push(`${bookId} ignored, because not valid book id`);
      }
    }

    const result = await bookShelfService.addBooks(bookShelfId, books);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'books data in book shelf updated',
        errors: errors.length > 0 ? errors : null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.removeBookFromBookShelfById = async (req, res) => {
  try {
    const bookShelfId = req?.params?.id;
    const bookId = req?.params?.bookId;
    let errors = [];

    const result = await bookShelfService.removeBook(bookShelfId, bookId);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'books data in book shelf updated',
        errors: errors.length > 0 ? errors : null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book shelf data not found',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};

exports.deleteBookShelfById = async (req, res) => {
  try {
    const bookShelfId = req?.params?.id;
    const result = await bookShelfService.deleteBookShelfById(bookShelfId);
    res.json({
      success: true,
      data: result,
      message: 'book shelf data deleted',
      errors: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error?.message || 'something went wrong',
      errors: error,
    });
  }
};
