/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as wishListService from '../services/wishlist.service';

export const addToWishlist = async (req, res, next) => {
    try {
        const wishList = {
            userId: req.user._id
        };
        const data = await wishListService.addToWishlist(req.params._id, wishList);
        if (data === 'Book Already Exist') {
            res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: `The Book is already in your wishlist.`
            });
        } else if (data === 'Cannot add to wishlist') {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Error ocurred while adding to list.`
            });
        } else {
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: data,
                message: `The book has Been added to wishlist!`
            });
        }
    } catch (err) {
        next(err);
    }
};

export const removeFromWishList = async (req, res, next) => {
    try {
        const ids = {
            userId: req.user._id,
            bookId: req.params._id
        }
        const data = await wishListService.removeFromWishList(ids);
        if (data === 'Cannot remove from wishlist') {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: data,
                message: `Error ocurred while removing books from wish list.`
            });
        } else {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: `The Book has been removed from wish list!`
            });
        }
    } catch (err) {
        next(err);
    }
};