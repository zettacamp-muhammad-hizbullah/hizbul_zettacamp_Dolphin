const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type BookPurchaseResult {
    books: Book
    terms: [Term]
    discount_percentage: String
    total_discount: Int
    tax_percentage: String
    total_tax: Int
    total_price: Int
    book_qty: Int
  }
  type Term {
    date: String
    amount: Int
  }
  type Author {
    first_name: String
    last_name: String
  }
  type Book {
    _id: ID!
    title: String!
    price: Int!
    stock: Int
    author: Author
    genre: [String]
    is_for_sell: Boolean
  }

  input AuthorRequest {
    first_name: String!
    last_name: String!
  }
  input AdditionalPrice {
    target_term: Int
    price: Int
  }
  input BookRequest {
    title: String!
    price: Int!
    stock: Int!
    is_for_sell: Boolean
    genre: [String]
    author: AuthorRequest
  }

  type Query {
    getBooks(page: Int, perPage: Int): [Book]!
    getBook(bookId: String!): Book!
  }
  type Mutation {
    purchaseBook(
      book_id: String!
      amount: Int
      term: Int
      stock: Int
      discount: Int
      tax: Int
      additional_price: AdditionalPrice
    ): BookPurchaseResult

    updateBookById(book_id: String!, book_request: BookRequest!): Book
    createBook(book_request: BookRequest!): Book
    deleteBookById(book_id: String!): Book
  }
`;
// getArticle(id: ID!): ArticleWithComment!,
// getComments(page: Int, perPage: Int, filter: String, sortBy: String, search: String): Comments!,
// getComment(id: ID!): CommentWithArticle!,

// type ArticleWithComment {
//     _id: ID!,
//     title: String!,
//     content: String!,
//     writer: String!,
//     comments: [Comment!]!
// }
// type Article {
//     _id: ID!,
//     title: String!,
//     content: String!,
//     writer: String!,
// }
// type Articles {
//     data: [Article]!,
//     pageInfo: PageInfo!
// }
// type CommentWithArticle {
//     _id: ID!,
//     name: String!,
//     comment: String!,
//     article: Article
// }
// type Comment {
//     _id: ID!,
//     name: String!,
//     comment: String!,
// }
// type Comments {
//     data: [Comment]!,
//     pageInfo: PageInfo!
// }

// type Mutation {
//     createArticle(title: String!, content: String!, writer: String!): Article!,
//     updateArticle(id: ID!, title: String, content: String, writer: String): Article!,
//     deleteArticle(id: ID!): String!,

//     createComment(name: String!, comment: String!, articleId: ID!): Comment!,
//     updateComment(id: ID!, name: String, comment: String): Comment!,
//     deleteComment(id: ID!): String!,
// }
