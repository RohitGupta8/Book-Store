"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../controllers/user.controller"));

var _user2 = require("../validators/user.validator");

var _auth = require("../middlewares/auth.middleware");

var _book = require("../validators/book.validators");

var bookController = _interopRequireWildcard(require("../controllers/book.controller"));

var _uploadImage = require("../middlewares/uploadImage");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable prettier/prettier */

/* eslint-disable max-len */

/* eslint-disable prettier/prettier */
var router = _express["default"].Router(); //route to create a new user


router.post('/user', (0, _auth.setRole)('user'), _user2.newUserValidator, userController.newUser);
router.post('/admin', _user2.newUserValidator, (0, _auth.setRole)('admin'), userController.newUser);
router.post('/login', userController.login); // sendmail  for one time password for  forgetPassword

router.post('/forgetpassword', userController.forgetPassword); // api for reset password

router.patch('/reset', userController.resetPassword); //api for add books

router.post('/book', _auth.userAuth, _auth.isAdmin, _uploadImage.upload.single('image'), _book.newBookValidator, bookController.addBook); //api for get books

router.get('/book', _auth.userAuth, bookController.getBook); //api for get book by ID

router.get('/book/:_id', _auth.userAuth, bookController.getBookID); //api for Delete book by ID

router["delete"]('/book/:_id', _auth.userAuth, bookController.deleteBook); //api for Delete book by ID

router.put('/book/:_id', _auth.userAuth, _book.newBookValidator, bookController.updateBook);
var _default = router;
exports["default"] = _default;