/* eslint-disable prettier/prettier */
import Book from '../models/book.model';

export const addBook = async (body) => {
  const data = await Book.create(body);
  return data;
};

export const getBook = async () => {
    const data = await Book.find();
    return data;
};

export const getBookID = async (id) => {
    const data = await Book.findById(id);
    return data;
};

export const deleteBook = async (id) => {
    const data = await Book.findByIdAndDelete(id);
    return data;
};