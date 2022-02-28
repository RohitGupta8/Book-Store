"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newBookValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

/* eslint-disable prettier/prettier */

/* eslint-disable max-len */

/* eslint-disable prettier/prettier */
var newBookValidator = function newBookValidator(req, res, next) {
  var schema = _joi["default"].object({
    author: _joi["default"].string().min(2).required().pattern(new RegExp('^[A-Za-z ]{2,}$')),
    title: _joi["default"].string().min(2).required(),
    image: _joi["default"].string(),
    quantity: _joi["default"].number().required(),
    price: _joi["default"].number().required(),
    description: _joi["default"].string().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newBookValidator = newBookValidator;