const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAssistantInput(data){
  let errors = {};

  if(!Validator.isMobilePhone(data.phone)){
    errors.phone = "Phone number is invalid"
  }

  if(isEmpty(data.name)){
    errors.name = "Name field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}