const express = require('express');
const router = require('./routes/routes');

const app = express();
const port = 4000;

app.use(express.json());

router(app);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
