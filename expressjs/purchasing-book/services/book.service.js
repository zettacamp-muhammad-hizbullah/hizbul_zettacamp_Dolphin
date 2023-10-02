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

exports.retriveAllBooks = async () => {
  try {
    // result = await Model.book.find();
    result = await Model.book.find();
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooks = async (limit, skip) => {
  let skipData = (skip - 1) * limit;
  let result = [];
  console.log('limit', limit);
  try {
    // result = await Model.book.find();
    result = await Model.book.aggregate([
      {
        $skip: skipData,
      },
      {
        $limit: limit,
      },
      // {
      //   $facet: {
      //     paginated_book: [
      //       {
      //         $skip: skipData,
      //       },
      //       {
      //         $limit: limit,
      //       },
      //     ],
      //     group_by_author: [
      //       {
      //         $skip: skipData,
      //       },
      //       {
      //         $limit: limit,
      //       },
      //       {
      //         $group: {
      //           _id: '$author',
      //           books: { $push: '$$ROOT' },
      //         },
      //       },
      //     ],
      //   },
      // },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooksGroupByAuthor = async () => {
  let result = [];
  try {
    result = await Model.book.aggregate([
      {
        $group: {
          _id: '$author',
          books: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooksFacet = async () => {
  let result = [];
  try {
    result = await Model.book.aggregate([
      {
        $facet: {
          group_by_author: [
            {
              $group: {
                _id: '$author',
                books: {
                  $push: '$$ROOT',
                },
              },
            },
          ],
          group_by_price: [
            {
              $group: {
                _id: '$price',
                books: { $push: '$$ROOT' },
              },
            },
          ],
        },
      },
      // {
      //   $sort: {
      //     price: sortBy,
      //   },
      // },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBooksAggregate = async (authorFirstName = 'Hasanudin', sortBy = 1) => {
  let result = [];
  try {
    result = await Model.book.aggregate([
      {
        $match: {
          'author.first_name': authorFirstName,
        },
      },
      {
        $sort: {
          price: sortBy,
        },
      },
      {
        $project: {
          title: 1,
          price: 1,
          author: {
            first_name: 1,
            last_name: 1,
            full_name: {
              $concat: ['$author.first_name', ' ', '$author.last_name'],
            },
          },
        },
      },
      {
        $addFields: {
          discount: 10000,
        },
      },
      {
        $addFields: {
          price_after_discount: {
            $subtract: ['$price', '$discount'],
          },
        },
      },
    ]);
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.retriveBookById = async (bookId) => {
  let result = null;
  try {
    result = await Model.book.findOne({ _id: bookId });
    // console.log(result);
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
      runValidators: true,
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
