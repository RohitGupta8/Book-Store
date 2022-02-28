"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

/* eslint-disable prettier/prettier */

/* eslint-disable max-len */

/* eslint-disable prettier/prettier */
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname);

    cb(null, Date.now() + ext);
  }
});

var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: function fileFilter(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
exports.upload = upload;