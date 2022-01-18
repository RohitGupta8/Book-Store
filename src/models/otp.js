/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const otpSchema = new Schema(
  {
    email: String,
    code: String,
    expireIn: Number
  },
  {
    timestamps: true
  }
);
export default model('OTP',otpSchema)
