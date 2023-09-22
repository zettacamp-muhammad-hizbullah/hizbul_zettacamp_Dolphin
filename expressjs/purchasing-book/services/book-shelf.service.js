const mongoose = require('mongoose');
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

exports.retriveBookShelvesAggregate = async () => {
  let result = [];
  try {
    result = await Model.bookShelf.aggregate([
      {
        $project: {
          embedded_books: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      // {
      //   $unwind: '$books',
      // },
      {
        $lookup: {
          from: 'books',
          localField: 'books',
          foreignField: '_id',
          as: 'books_data',
        },        
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesGenreDistinct = async () => {
  let result = [];
  try {
    result = await Model.bookShelf
      .find()
      .populate('books')
      .exec(function (err, bookShelf) {});

    // result = await Model.bookShelf.find().populate('books').distinct('books.genre');
    // result = await Model.bookShelf
    //   .find({}, function(err, result) {
    //     console.log(result);
    //   })
    // .distinct('books', function(err, book) {

    //   console.log(book);
    // });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesGenreDistinctEmbedded = async () => {
  let result = [];
  try {
    result = await Model.bookShelf.find().distinct('embedded_books.genre');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesElemMatch = async (value) => {
  let result = [];
  try {
    result = await Model.bookShelf
      .find()
      .select(['-embedded_books'])
      .populate({
        path: 'books',
        match: {
          genre: {
            $elemMatch: {
              $eq: value,
            },
          },
        },
      });

    // result = await Model.bookShelf
    //   .find({
    //     books: {
    //       $elemMatch: {
    //         $in: value,
    //       },
    //     },
    //   })
    //   .populate('books');
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookShelvesElemMatchEmbedded = async (value) => {
  let result = [];
  try {
    result = await Model.bookShelf
      .find({
        embedded_books: {
          $elemMatch: {
            genre: 'story',
            price: 143000,
          },
        },
      })
      .select(['-books']);
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

exports.updateBookShelfArrayFilter = async (bookShelfId, bookId, newBookId) => {
  let result = null;
  try {
    // result = await Model.bookShelf.findOneAndUpdate(
    //   { _id: bookShelfId },
    //   {
    //     $set: {
    //       'books.$[book]': newBookId,
    //     },
    //   },
    //   {
    //     arrayFilters: [{ book: bookId }],
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    result = await Model.bookShelf.findOneAndUpdate(
      { _id: bookShelfId },
      {
        $set: {
          'books.$[book]': newBookId,
        },
      },
      {
        arrayFilters: [{ book: bookId }],
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.updateBookShelfArrayFilterEmbedded = async (bookShelfId, bookId, newStock) => {
  let result = null;
  try {
    result = await Model.bookShelf.findOneAndUpdate(
      { _id: bookShelfId },
      {
        $set: {
          'embedded_books.$[book].stock': newStock,
        },
      },
      {
        arrayFilters: [
          {
            'book._id': {
              $eq: bookId,
            },
          },
        ],
        new: true,
        select: '-embedded_books',
        runValidators: true,
      }
    );
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
