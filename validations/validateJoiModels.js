const joi = require('joi');
const validationModels = require('./validationModels');
module.exports.validate = (reqBody, model) => {
  try {
    return validationModels[model].validate(reqBody);
  } catch (error) {
    return error;
  }
};
module.exports.generateValidationResponse = (ret) => {
  let message = '';
  console.log(ret.error.details)
  ret.error.details.forEach(element => {
    message += `${element.context.label}, `;
  });
  return {
    message: 'Request parameters are not valid',
    additionalInfo: message
  };
};
