"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

/* eslint-disable prettier/prettier */
var otpSchema = new _mongoose.Schema({
  email: String,
  code: String,
  expireIn: Number
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('OTP', otpSchema);

exports["default"] = _default;