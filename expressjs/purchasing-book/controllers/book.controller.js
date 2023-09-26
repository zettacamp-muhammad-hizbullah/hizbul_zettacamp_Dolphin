const bookService = require('../services/book.service');

exports.storeBook = async (req, res) => {
  try {
    const reqBody = req?.body;

    const payload = {
      title: reqBody?.title,
      price: reqBody?.price,
      stock: reqBody?.stock,
    };

    const result = await bookService.createOneBook(payload);
    res.json({
      success: true,
      data: result,
      message: 'book stored successfully',
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

exports.getBooks = async (req, res) => {
  try {
    let perPage = req?.query?.perPage || 10;
    let page = req?.query?.page || 1;

    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }

    const result = await bookService.retriveBooks(Number(perPage), Number(page));
    res.json({
      success: true,
      data: result,
      message: 'books data retrived',
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

exports.getBooksAggregate = async (req, res) => {
  try {
    const authorFirstName = req?.query?.author_first_name;
    const sortBy = req?.query?.sort_by;
    const result = await bookService.retriveBooksAggregate(authorFirstName, sortBy === 'asc' ? 1 : -1);
    res.json({
      success: true,
      data: result,
      message: 'books data retrived',
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

exports.getBooksAggregateFacet = async (req, res) => {
  try {
    const result = await bookService.retriveBooksFacet();
    res.json({
      success: true,
      data: result,
      message: 'books data retrived',
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

exports.getBooksAggregateGroup = async (req, res) => {
  try {
    const result = await bookService.retriveBooksGroupByAuthor();
    res.json({
      success: true,
      data: result,
      message: 'books data retrived',
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

exports.getBookById = async (req, res) => {
  try {
    const bookId = req?.params?.id;
    const result = await bookService.retriveBookById(bookId);
    console.log(result);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book data retrived',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book data not found',
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

exports.updateBookById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookId = req?.params?.id;

    const payload = {
      title: reqBody?.title,
      price: reqBody?.price,
      stock: reqBody?.stock,
    };

    const result = await bookService.updateBook(bookId, payload);
    console.log(result);
    if (result) {
      res.json({
        success: true,
        data: result,
        message: 'book data updated',
        errors: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      data: result,
      message: 'book data not found',
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

exports.deleteBookById = async (req, res) => {
  try {
    const bookId = req?.params?.id;
    const result = await bookService.deleteBookById(bookId);
    res.json({
      success: true,
      data: result,
      message: 'book data deleted',
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
