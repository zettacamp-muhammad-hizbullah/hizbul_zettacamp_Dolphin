const bookController = require('../controllers/book.controller');
const bookShelfController = require('../controllers/book-shelf.controller');
const bookPurchaseController = require('../controllers/book-purchasing.controller');

module.exports = {
  Mutation: {
    purchaseBook: (_, args) => {
      return bookPurchaseController.purchaseBook({ body: args });
    },
  },
  Query: {
    // BOOK
    getBooks: (_, { page, perPage }) => {
      console.log('gql', page, perPage);
      return bookController.getBooks(page, perPage);
    },

    // createArticle: async ({ title, content, writer }) => ArticleController.create({ title, content, writer }),

    // getArticle: async ({ id }) => ArticleController.readOne({ id }),

    // updateArticle: async ({ id, title = null, content = null, writer = null }) => ArticleController.update({ id, title, content, writer }),

    // deleteArticle: async ({ id }) => ArticleController.delete({ id }),

    // // COMMENT
    // getComments: async ({ page = 1, perPage = 10, filter = 'createdAt', sortBy = 'asc', search = null }) =>
    //   CommentController.read({ page, perPage, filter, sortBy, search }),

    // createComment: async ({ name, comment, articleId }) => CommentController.create({ name, comment, articleId }),

    // getComment: async ({ id }) => CommentController.readOne({ id }),

    // updateComment: async ({ id, name = null, comment = null }) => CommentController.update({ id, name, comment }),

    // deleteComment: async ({ id }) => CommentController.delete({ id }),
  },
};
