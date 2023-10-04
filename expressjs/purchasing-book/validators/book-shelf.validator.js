const { ApolloError } = require('apollo-server-express');

exports.bookShelfCreateValidator = async (req, res, next) => {
  const reqBody = req?.book_shelf_request;
  const errors = [];

  if (!reqBody?.name) {
    errors.push('name is required');
  }

  if (errors.length > 0) {
    throw new ApolloError(errors, 'BAD_REQUEST');
  }
};

exports.bookShelfUpdateValidator = async (req, res, next) => {
  const reqBody = req?.book_shelf_request;
  const errors = [];

  if (!reqBody?.name) {
    errors.push('name is required');
  }

  if (errors.length > 0) {
    throw new ApolloError(errors, 'BAD_REQUEST');
  }
};

exports.bookShelfAddBookValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.books) {
    errors.push('books is required');
  }
  if (reqBody?.books?.length < 1) {
    errors.push('books length minimum 1');
  }

  if (errors.length > 0) {
    throw new ApolloError(errors, 'BAD_REQUEST');
  }
};
