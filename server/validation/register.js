const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

  // username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};