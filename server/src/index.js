const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config({ path: __dirname + '/.env' });

const middleware = require("./middlewares");
const logs = require('./api/logs');


const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "HELLO WORLD!",
  });
});

app.use('/api/logs', logs);


//route error designating middleware
app.use(middleware.notFound);
//actual error handling middleware
app.use(middleware.errorHandler);



const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at ${port} port...`);
});


