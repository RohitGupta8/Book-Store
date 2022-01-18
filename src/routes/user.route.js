/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { setRole } from '../middlewares/auth.middleware';
import { newBookValidator } from '../validators/book.validators';
import { userAuth } from '../middlewares/auth.middleware';
import * as bookController from '../controllers/book.controller'

const router = express.Router();

//route to create a new user
router.post('/user', setRole('user'), newUserValidator, userController.newUser);

router.post('/admin', newUserValidator, setRole('admin'), userController.newUser);

router.post('/login', userController.login);

// sendmail  for one time password for  forgetPassword
router.post('/forgetpassword', userController.forgetPassword);

// api for reset password
router.patch('/reset', userController.resetPassword);

//api for add books
router.post('/book',userAuth, newBookValidator, bookController.addBook);

//api for get books
router.get('/book', userAuth, bookController.getBook);

export default router;
