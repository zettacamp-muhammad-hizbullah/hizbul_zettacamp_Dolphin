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
    book_shelf: BookShelf
  }
  type BookShelf {
    _id: ID!
    name: String
    books: [Book]
  }
  type LoginResponse {
    token: String
    user: User
  }
  type User {
    username: String
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
    getBookShelf(bookShelfId: String!): BookShelf!
    getBookShelves: [BookShelf]
  }
  type Mutation {
    login(username: String!, password: String!): LoginResponse
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

exports.publicOperations = ['login'];
