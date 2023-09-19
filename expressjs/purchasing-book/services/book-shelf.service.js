const Model = require('../models/index.model');

exports.createOneBookShelf = async (payload) => {
  let result = null;
  try {
    result = await Model.bookShelf.create(payload);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelves = async (bookId) => {
  let result = [];
  try {
    if (bookId) {
      result = await Model.bookShelf
        .find({
          books: {
            $in: bookId,
          },
        })
        .populate('books');
    } else {
      result = await Model.bookShelf.find().populate('books');
    }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelfById = async (bookId) => {
  let result = null;
  try {
    result = await Model.bookShelf.findOne({ _id: bookId }).populate('books');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.updateBookShelf = async (bookId, payload) => {
  let result = null;
  try {
    result = await Model.bookShelf.findOneAndUpdate({ _id: bookId }, payload, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.addBooks = async (bookShelfId, books) => {
  let result = null;
  try {
    result = await Model.bookShelf.findOneAndUpdate(
      { _id: bookShelfId },
      {
        $addToSet: {
          books: books,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.removeBook = async (bookShelfId, bookId) => {
  let result = null;
  try {
    console.log('bookId', bookId);
    result = await Model.bookShelf.findOneAndUpdate(
      { _id: bookShelfId },
      {
        $pull: {
          books: bookId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  return result;
};

exports.deleteBookShelfById = async (bookId) => {
  let result = null;
  try {
    // result = await Model.book.deleteOne({ _id: bookId });
    result = await Model.bookShelf.findOneAndDelete({ _id: bookId });
    if (!result) {
      throw new Error('no data to delete');
    }
  } catch (error) {
    throw new Error(error);
  }

  return result;
};
