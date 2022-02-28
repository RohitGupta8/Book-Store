/* eslint-disable prettier/prettier */
import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller';

const wishlistRouter = express.Router();
//route for add to wish list
wishlistRouter.post('/:_id', userAuth, wishlistController.addToWishlist)
//route for remove from wish list
wishlistRouter.put('/:_id', userAuth, wishlistController.removeFromWishList)


export default wishlistRouter;