/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.services';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBook = async (req, res, next) => {
    try {
        const bookData = {
            author: req.body.author,
            title: req.body.title,
            image: req.file.path,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description
        };
        const data = await BookService.addBook(bookData);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: `The Book "${data.title}" has Been Added!`
        });
    } catch (err) {
        next(err);
    }
};


export const getBook = async (req, res, next) => {
    try {
        const data = await BookService.getBook();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Books fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const getBookID = async (req, res, next) => {
    try {
        const data = await BookService.getBookID(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book fetched by Id successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const data = await BookService.deleteBook(req.params._id);
        res.status(HttpStatus.NO_CONTENT).json({
            code: HttpStatus.NO_CONTENT,
            data: data,
            message: 'Book Deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const data = await BookService.updateBook(req.params._id,req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book updated successfully'
        });
    } catch (error) {
        next(error);
    }
};