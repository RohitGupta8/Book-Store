"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.newUser = exports.login = exports.forgetPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _otp = _interopRequireDefault(require("../models/otp"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _sendEmail = require("../utils/sendEmail");

/* eslint-disable prettier/prettier */

/* eslint-disable max-len */
_dotenv["default"].config();

//create new user
var newUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var HashedPassword, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].hash(body.password, 10);

          case 2:
            HashedPassword = _context.sent;
            body.password = HashedPassword;
            _context.next = 6;
            return _user["default"].create(body);

          case 6:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function newUser(_x) {
    return _ref.apply(this, arguments);
  };
}(); // user login api


exports.newUser = newUser;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, token, validate;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            data = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              email: body.email,
              id: body._id
            }, process.env.SECRET, {
              expiresIn: '5h'
            });
            _context2.next = 6;
            return _bcrypt["default"].compare(body.password, data.password);

          case 6:
            validate = _context2.sent;

            if (!validate) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", token);

          case 11:
            throw new Error('Invalid password');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //api for forgot password


exports.login = login;

var forgetPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var SearchMail;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].find({
              email: body.email
            });

          case 2:
            SearchMail = _context3.sent;

            if (!SearchMail) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", (0, _sendEmail.sendEmail)(body));

          case 7:
            return _context3.abrupt("return", false);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgetPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); // api for reset password


exports.forgetPassword = forgetPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var codepresent, HashedPassword, success;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _otp["default"].findOne({
              email: body.email,
              code: body.code
            });

          case 2:
            codepresent = _context4.sent;

            if (!codepresent) {
              _context4.next = 15;
              break;
            }

            _context4.next = 6;
            return _bcrypt["default"].hash(body.password, 10);

          case 6:
            HashedPassword = _context4.sent;
            body.password = HashedPassword;
            _context4.next = 10;
            return _user["default"].findOneAndUpdate(body.email, {
              $set: {
                password: HashedPassword
              }
            }, {
              "new": true
            });

          case 10:
            success = _context4.sent;
            console.log('8', success);

            if (success) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", false);

          case 14:
            return _context4.abrupt("return", success);

          case 15:
            return _context4.abrupt("return", false);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;