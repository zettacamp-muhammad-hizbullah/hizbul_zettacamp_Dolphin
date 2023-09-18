const express = require('express');
const router = require('./routes/routes');
const { DB } = require('./database/db');

const app = express();
const port = 4000;

app.use(express.json());

router(app);

DB.connect();

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
