const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data){
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required."
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};