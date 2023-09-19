const { DB } = require('../database/db');
const model = {};

model.book = require('./book.model')(DB.mongoose);
model.bookShelf = require('./book-shelf.model')(DB.mongoose);

module.exports = model;
