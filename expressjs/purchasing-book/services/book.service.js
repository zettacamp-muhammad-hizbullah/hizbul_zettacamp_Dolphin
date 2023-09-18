const Model = require('../models/index.model');

exports.createOneBook = async (payload) => {
  let result = null;
  try {
    result = await Model.book.create(payload);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooks = async () => {
  let result = [];
  try {
    result = await Model.book.find();
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookById = async (bookId) => {
  let result = null;
  try {
    result = await Model.book.findOne({ _id: bookId });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.updateBook = async (bookId, payload) => {
  let result = null;
  try {
    result = await Model.book.findOneAndUpdate({ _id: bookId }, payload, {
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.deleteBookById = async (bookId) => {
  let result = null;
  try {
    // result = await Model.book.deleteOne({ _id: bookId });
    result = await Model.book.findOneAndDelete({ _id: bookId });
    if (!result) {
      throw new Error('no data to delete');
    }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};
