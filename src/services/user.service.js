/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import User from '../models/user.model';
import OTP from '../models/otp';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { sendEmail } from '../utils/sendEmail'

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
  const token = jwt.sign({ email: body.email, id: body._id }, process.env.SECRET, { expiresIn: '5h' });

  const validate = await bcrypt.compare(body.password, data.password);
  if (validate) {
    return token;
  } else {
    throw new Error('Invalid password');
  }
};

//api for forgot password
export const forgetPassword = async (body) => {
  const SearchMail = await User.find({ email: body.email });
  if (SearchMail) {
    return sendEmail(body);
  } else {
    return false;
  }
}

// api for reset password
export const resetPassword = async (body) => {
  const codepresent = await OTP.findOne({ email: body.email, code: body.code });
  if (codepresent) {
    console.log('1', codepresent);
    const HashedPassword = await bcrypt.hash(body.password, 10);
    body.password = HashedPassword
    console.log('2', HashedPassword);
    const success = await User.findOneAndUpdate({ email: body.email }, { $set: { password: HashedPassword } },{new:true});
    console.log('8',success);
    if (!success) {
      console.log('3 - error');
      return false;
    }
    console.log('4',success);
    return success
  }
  console.log('5- error');
  return false;
}