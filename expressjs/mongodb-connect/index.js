const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';

mongoose
  .connect(DB_URL, {
    dbName: 'profiles',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });
