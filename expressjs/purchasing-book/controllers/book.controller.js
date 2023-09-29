const bookService = require('../services/book.service');

exports.storeBook = async (req, res) => {
  try {
    const reqBody = req?.body;

    const payload = {
      title: reqBody?.title,
      price: reqBody?.price,
      stock: reqBody?.stock,
      genre: reqBody?.genre,
      author: reqBody?.author,
      is_for_sell: reqBody?.is_for_sell,
    };

    const result = await bookService.createOneBook(payload);
    return result;
    // res.json({
    //   success: true,
    //   data: result,
    //   message: 'book stored successfully',
    //   errors: null,
    // });
  } catch (error) {
    return error;
    // res.status(500).json({
    //   success: false,
    //   data: null,
    //   message: error?.message || 'something went wrong',
    //   errors: error,
    // });
  }
};

exports.getBooks = async (page = 1, perPage = 10) => {
  console.log('page', page);
  console.log('perPage', perPage);
  try {
    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }
    // throw new Error('gak ada data');
    const result = await bookService.retriveBooks(Number(perPage), Number(page));
    return result;
  } catch (error) {
    return error;
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
    console.log(bookId);
    const result = await bookService.retriveBookById(bookId);
    console.log(result);
    if (result) {
      return result;
      // res.json({
      //   success: true,
      //   data: result,
      //   message: 'book data retrived',
      //   errors: null,
      // });
      // return;
    } else {
      return null;
    }
    // res.status(404).json({
    //   success: false,
    //   data: result,
    //   message: 'book data not found',
    //   errors: null,
    // });
  } catch (error) {
    return error;
    // res.status(500).json({
    //   success: false,
    //   data: null,
    //   message: error?.message || 'something went wrong',
    //   errors: error,
    // });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const reqBody = req?.body;
    const bookId = req?.params?.id;
    console.log('bookId', bookId);

    const payload = {
      title: reqBody?.title,
      price: reqBody?.price,
      stock: reqBody?.stock,
    };
    console.log('payload', payload);
    const result = await bookService.updateBook(bookId, payload);
    console.log(result);
    if (result) {
      return result;
      // res.json({
      //   success: true,
      //   data: result,
      //   message: 'book data updated',
      //   errors: null,
      // });
      // return;
    }

    // res.status(404).json({
    //   success: false,
    //   data: result,
    //   message: 'book data not found',
    //   errors: null,
    // });
  } catch (error) {
    return error;
    // res.status(500).json({
    //   success: false,
    //   data: null,
    //   message: error?.message || 'something went wrong',
    //   errors: error,
    // });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const bookId = req?.params?.id;
    const result = await bookService.deleteBookById(bookId);
    return result;
    // res.json({
    //   success: true,
    //   data: result,
    //   message: 'book data deleted',
    //   errors: null,
    // });
  } catch (error) {
    return error;
    // res.status(500).json({
    //   success: false,
    //   data: null,
    //   message: error?.message || 'something went wrong',
    //   errors: error,
    // });
  }
};
