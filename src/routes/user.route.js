/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { setRole } from '../middlewares/auth.middleware'

const router = express.Router();

//route to create a new user
router.post('/user', setRole('user'),newUserValidator, userController.newUser);

router.post('/admin', newUserValidator, setRole('admin'), userController.newUser);

router.post('/login', userController.login);

// sendmail  for one time password for  forgetPassword
router.post('/forgetpassword', userController.forgetPassword);

router.patch('/reset', userController.resetPassword)

export default router;
