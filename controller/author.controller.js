const createError = require("http-errors");
const Author = require("../models/authorModel.js");

module.exports.list = (req, res, next) => {
  const { name } = req.query;
  const criterial = {};
  if (name) {
    criterial.name = name;
  }

  Author.find(criterial)
    .then((author) => res.json(author))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  Author.create(req.body)
    .then((author) => res.status(201).json(author))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Author.findByIdAndDelete(req.params.id)
    .then((author) => {
      if (!author) {
        next(createError(404, "Author doesnt exist"));
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => next(error));
};
