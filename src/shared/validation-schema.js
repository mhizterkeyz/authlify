const Joi = require("joi");

exports.SignUpValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.LoginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
