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
  const check = await User.findOne({ email: body.email });
  if (check) {
    const match = await bcrypt.compare(body.password, check.password);
    if (match) {
      const token = jwt.sign({ email: check.email, id: check._id, role: check.role }, process.env.SECRET);
      return token;
    } else {
      return 'Incorrect Password'
    }
  } else {
    return 'Not Registered Yet';
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
    const HashedPassword = await bcrypt.hash(body.password, 10);
    body.password = HashedPassword
    const success = await User.findOneAndUpdate(body.email, { $set: { password: HashedPassword } }, { new: true });
    console.log('8', success);
    if (!success) {
      return false;
    }
    return success
  }
  return false;
}