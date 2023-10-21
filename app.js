const mongoose = require("mongoose");
const createError = require("http-errors");
require("dotenv").config();
require("./config/db.config");
const express = require("express");
const app = express();
const api = require("./config/routes.config");
const { urlencoded } = require("express");

// aqui van cositas jeje

app.use(express.json());

// app.use(urlencoded)

app.use("/v1", api);
app.use((req, res, next) => next(createError(404, "route doesnt exist")));
app.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  ) {
    error = createError(404, "resource doesnt exist");
  } else if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (!error.status) {
    error = createError(500, error);
  }
  console.error(error);
  let errors;
  if (error.errors) {
    errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey].message || error.errors[errorKey];
      return errors;
    }, {});
  }
  const data = {
    message: error.message,
    errors,
  };
  res.status(error.status).json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`App running at ${port}`));
