/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import * as middleware from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/user', middleware.setRole('user'), newUserValidator, userController.newUser);

router.post('/admin', newUserValidator, middleware.setRole('admin'), userController.newUser);

router.post('/login', userController.login)

export default router;
