const { ApolloError } = require('apollo-server-express');

exports.validator = async (amountOfStock, amountOfPurchasedBook, bookDetail, percentageDiscount, percentageTax, lengthOfMonths) => {
  const errors = [];
  // console.log('validator stock', amountOfStock);
  if (lengthOfMonths < 1) {
    errors.push('invalid month value');
  }

  if (amountOfStock < 1) {
    errors.push('stock empty');
  }

  // if (amountOfStock < amountOfPurchasedBook) {
  //   errors.push('stock empty');
  // }

  if (amountOfStock < 0 || amountOfStock % 1 !== 0) {
    errors.push('invalid amount of stock, integer positive number required');
  }

  if (amountOfPurchasedBook < 1 || amountOfPurchasedBook % 1 !== 0) {
    errors.push('invalid amount of purchased book, minimum 1 and not decimal');
  }

  if (percentageDiscount < 0 || percentageDiscount > 100) {
    errors.push('discount amount invalid');
  }

  if (percentageTax < 0 || percentageTax > 100) {
    errors.push('percentage amount invalid');
  }

  if (!bookDetail) {
    errors.push('tell me what you want to buy!');
  }

  // if (errors.length > 0) {
  //   throw new ApolloError(errors, 'BAD_REQUEST');
  // }
  return errors;
};

exports.bookPurchaseValidator = async (req) => {
  const reqBody = req;
  const errors = [];

  if (!reqBody.amount) {
    errors.push('amount is required');
  }
  if (!reqBody.term) {
    errors.push('term is required');
  }

  if (isNaN(reqBody.amount)) {
    errors.push('amount must be number');
  }
  if (reqBody.amount < 1) {
    errors.push('amount must be greater then 0');
  }

  if (isNaN(reqBody.term)) {
    errors.push('term must be number');
  }
  if (reqBody.term < 1) {
    errors.push('term must be greater then 0');
  }

  if (isNaN(reqBody.discount)) {
    errors.push('discount must be number');
  }
  if (reqBody.discount < 0) {
    errors.push('discount must be greater then or equal 0');
  }

  if (isNaN(reqBody.tax)) {
    errors.push('tax must be number');
  }
  if (reqBody.tax < 0) {
    errors.push('tax must be greater then or equal 0');
  }

  if (!reqBody.book_id) {
    errors.push('book_id is required');
  }

  if (reqBody.additional_price) {
    if (!reqBody.additional_price.price) {
      errors.push('additional_price must an object and has price property');
    }
    if (!reqBody.additional_price.target_term) {
      errors.push('additional_price must an object and has target_term property');
    }
    if (reqBody.additional_price.target_term > reqBody.term || reqBody.additional_price.target_term < 1) {
      errors.push('additional_price must an object and has target_term less then term and not less then 1');
    }
  }

  if (errors.length > 0) {
    throw new ApolloError(errors, 'BAD_REQUEST');
  }
};

exports.bookCreateValidator = async (req) => {
  const reqBody = req.book_request;
  const errors = [];

  if (!reqBody.title) {
    errors.push('title is required');
  }
  if (!reqBody.price) {
    errors.push('price is required');
  }
  if (!reqBody.stock) {
    errors.push('stock is required');
  }

  if (isNaN(reqBody.price)) {
    errors.push('price must be number');
  }
  if (reqBody.price < 1) {
    errors.push('price must be greater then 0');
  }

  if (isNaN(reqBody.stock)) {
    errors.push('stock must be number');
  }
  if (reqBody.stock < 1) {
    errors.push('stock must be greater then 0');
  }

  if (errors.length > 0) {
    throw new ApolloError(errors, 'BAD_REQUEST');
  }
};

exports.bookUpdateValidator = async (req) => {
  const reqBody = req.book_request;
  const errors = [];

  if (!reqBody.title) {
    errors.push('title is required');
  }
  if (!reqBody.price) {
    errors.push('price is required');
  }
  if (!reqBody.stock) {
    errors.push('stock is required');
  }

  if (isNaN(reqBody.price)) {
    errors.push('price must be number');
  }
  if (reqBody.price < 1) {
    errors.push('price must be greater then 0');
  }

  if (isNaN(reqBody.stock)) {
    errors.push('stock must be number');
  }
  if (reqBody.stock < 1) {
    errors.push('stock must be greater then 0');
  }

  if (errors.length > 0) {
    throw new ApolloError(errors, 'BAD_REQUEST');
  }
};
