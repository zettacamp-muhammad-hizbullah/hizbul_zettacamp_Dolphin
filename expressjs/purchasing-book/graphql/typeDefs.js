const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type BookPurchaseResponse {
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
    book_shelf_id: String
    book_shelf: BookShelf
    created_at: String
    updated_at: String
  }
  type BookShelf {
    _id: ID!
    name: String
    book_ids: [String]
    books: [Book]
    created_at: String
    updated_at: String
  }
  type LoginResponse {
    token: String
    user: User
  }
  type User {
    username: String
  }

  input AuthorInput {
    first_name: String!
    last_name: String!
  }
  input AdditionalPriceInput {
    target_term: Int
    price: Int
  }
  input BookInput {
    title: String!
    price: Int!
    stock: Int!
    is_for_sell: Boolean
    genre: [String]
    author: AuthorInput
    book_shelf_id: String
  }
  input BookShelfInput {
    name: String!
    book_ids: [String]
  }

  type Query {
    getAllBooks(page: Int, per_page: Int): [Book]
    getOneBook(book_id: String!): Book

    getOneBookShelf(book_shelf_id: String!): BookShelf
    getAllBookShelves(book_id: String): [BookShelf]
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
      additional_price: AdditionalPriceInput
    ): BookPurchaseResponse

    updateBookById(book_id: String!, book_request: BookInput!): Book
    createBook(book_request: BookInput!): Book
    deleteBookById(book_id: String!): Book

    updateBookShelfById(book_shelf_id: String!, book_shelf_request: BookShelfInput!): BookShelf
    createBookShelf(book_shelf_request: BookShelfInput!): BookShelf
    deleteBookShelf(book_shelf_id: String!): BookShelf
  }
`;

exports.publicOperations = ['login'];
