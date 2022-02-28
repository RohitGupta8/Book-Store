/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import WishList from '../models/wishlist.model';
import Book from '../models/book.model';

export const addToWishlist = async (id, List) => {
    try {
        const listCheck = await WishList.findOne({ userId: List.userId });
        const bookData = await Book.findById(id);
        if (listCheck) {
            const book = {
                bookId: bookData._id,
                bookName: bookData.title,
                image: bookData.image,
                price: bookData.price
            };
            List.books = [...listCheck.books, book];
            let flag = false;
            for (let index = 0; index < listCheck.books.length; index++) {
                if (id === listCheck.books[index].bookId.toString()) {
                    flag = true;
                }
            }
            if (flag === true) {
                return 'Book Already Exist';
            } else {
                const data = await WishList.findByIdAndUpdate(listCheck._id, List, { new: true });
                return data;
            }
        } else {
            const book = {
                bookId: bookData._id,
                bookName: bookData.title,
                image: bookData.image,
                price: bookData.price
            };
            List.books = [book];
            const data = await WishList.create(List);
            return data;
        }
    } catch (error) {
        console.log(error);
        return 'Cannot add to wishlist';
    }
};

export const removeFromWishList = async (id) => {
    try {
        const updatedlist = await WishList.findOneAndUpdate({ userId: id.userId }, { $pull: { books: { bookId: id.bookId } } }, { new: true });
        return updatedlist;
    } catch (error) {
        return 'Cannot remove from wishlist';
    }
};