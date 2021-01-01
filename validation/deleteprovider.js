const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProviderInput (data) {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = 'Email field is required';
  }

  if (isEmpty(data.name2)) {
    errors.name2 = 'Confirm email field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}