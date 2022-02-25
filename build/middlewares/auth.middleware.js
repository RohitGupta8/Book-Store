"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuth = exports.setRole = exports.isAdmin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable prettier/prettier */

/* eslint-disable quotes */

/* eslint-disable prettier/prettier */

/* eslint-disable eqeqeq */

/* eslint-disable prettier/prettier */
_dotenv["default"].config();
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */


var userAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken, _jwt$verify, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bearerToken = req.header('Authorization');

            if (bearerToken) {
              _context.next = 4;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 4:
            bearerToken = bearerToken.split(' ')[1];
            _jwt$verify = _jsonwebtoken["default"].verify(bearerToken, process.env.SECRET), user = _jwt$verify.user;
            res.locals.user = user;
            res.locals.token = bearerToken;
            next();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function userAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.userAuth = userAuth;

var setRole = function setRole(role) {
  return function (req, res, next) {
    console.log('role ', role);
    req.body.role = role;
    next();
  };
};

exports.setRole = setRole;

var isAdmin = function isAdmin(req, res, next) {
  var bearerToken = req.header('Authorization');
  bearerToken = bearerToken.split(' ')[1];

  var user = _jsonwebtoken["default"].verify(bearerToken, process.env.SECRET);

  var role = user.role;

  if (role === 'admin') {
    next();
  } else {
    return res.send({
      message: 'You are not authorized to make this request'
    });
  }
};

exports.isAdmin = isAdmin;