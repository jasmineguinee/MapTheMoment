import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const VenueSpec = {
  title: Joi.string().required(),
  venuetype: Joi.string().required(),
  description: Joi.string().required(),
};

export const AreaSpec = {
  title: Joi.string().required(),
};