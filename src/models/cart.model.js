/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
import mongoose from 'mongoose'
import User from './user.model';
import Book from './book.model';

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    bookName: [{
        type: String,
        required: true
    }],
    quantityPerBook: [{
        type: Number,
        required: true
    }],
    totalQuantity: {
        type: Number,
        required: true
    },
    prices: [{
        type: Number,
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    isPurchased: {
        type: Boolean,
        default: false
    }
});
const Cart = model('Cart', cartSchema);
export default Cart;