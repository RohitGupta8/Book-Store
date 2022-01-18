/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { forgot, newUserValidator } from '../validators/user.validator';
import { setRole } from '../middlewares/auth.middleware'

const router = express.Router();

//route to create a new user
router.post('/user', setRole('user'),newUserValidator, userController.newUser);

router.post('/admin', newUserValidator, setRole('admin'), userController.newUser);

router.post('/login', userController.login)

// sendmail to reset forgetPassword
router.post('/forgetpassword', forgot, userController.forgetPassword)

export default router;
