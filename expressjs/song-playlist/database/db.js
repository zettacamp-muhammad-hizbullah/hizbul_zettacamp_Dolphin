const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'songs';

const db_connect = () => {
  mongoose
    .connect(DB_URL, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info('connected to mongodb', ', with database = ', DB_NAME);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.DB = {
  mongoose: mongoose,
  connect: db_connect,
};
