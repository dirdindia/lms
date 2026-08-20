const Joi = require('joi');

const contactValidation = {
  createContact: Joi.object({
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    class: Joi.string().required(),
    language: Joi.string().required(),
    message: Joi.string().allow('', null)
  })
};

module.exports = { contactValidation };
