/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Login Successfully.....'
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword=async (req,res,next)=>{
  try {
    const data= await UserService.forgetPassword(req);
    res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      data:data,
      message:'Mail Sent Sucesssfully'
    })
  } catch (error) {
    next(error);
  }
}