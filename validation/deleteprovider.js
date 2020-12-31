const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDeleteInput (data) {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (isEmpty(data.email2)) {
    errors.email2 = 'Confirm email field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}