// route notfound error handling middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); //setting the error status for the request
  next(error); //this will send the error to the error handling middleware
};

//general error handling middleware
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; //checks if some other route than the one specified had errors, and then again sets the statuscode
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "hi" : error.stack, //tells the line of error, usesful for debugging, but not for production level
  });
};

module.exports = {
  notFound,
  errorHandler,
};
