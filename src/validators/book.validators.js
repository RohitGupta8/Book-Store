/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';

export const newBookValidator = (req, res, next) => {
  const schema = Joi.object({
      author: Joi.string().min(2).required().pattern(new RegExp('^[A-Za-z ]{2,}$')),

      title: Joi.string().min(2).required(),

      quantity: Joi.number().required(),

      price: Joi.number().required(),

      description: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
