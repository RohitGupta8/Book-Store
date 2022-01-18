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
        const data = await BookService.addBook(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Book created successfully'
        });
    } catch (error) {
        next(error);
    }
};