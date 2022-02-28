/* eslint-disable prettier/prettier */
import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware'
import { newCartValidator } from '../validators/cart.validator'

const cartRouter = express.Router();

//route to add book to cart
cartRouter.post('/:_id', userAuth, newCartValidator, cartController.addToCart);
//route to remove book from cart
cartRouter.put('/', userAuth, cartController.removeBookFromCart);
//route to confirm booking
cartRouter.put('/:_id', userAuth, cartController.confirmBooking);
//route to view cart
cartRouter.get('/', userAuth, cartController.viewCart);

export default cartRouter;