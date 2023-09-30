// app.js
require("./api/data/db.js");
const express = require('express');
const app = express();
const port = 5555;
const populationRoutes = require('./api/routes/populationRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.text());

app.use('/api/population', populationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});