/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import User from './user.model';
import Book from './book.model';

const wishListSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    books: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        bookName: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
})

const wishList = model('wishlist', wishListSchema);
export default wishList;