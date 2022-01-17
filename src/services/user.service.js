/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//create new user
export const newUser = async (body) => {
  const HashedPassword = await bcrypt.hash(body.password, 10);
  body.password = HashedPassword;
  const data = await User.create(body);
  return data;
};

// user login api
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  const token = jwt.sign({ email: body.Email, id: body._id }, process.env.SECRET, { expiresIn: '5h' });

  const validate = await bcrypt.compare(body.password, data.password);
  if (validate) {
    return token;
  } else {
    throw new Error('Invalid password');
  }
};
