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