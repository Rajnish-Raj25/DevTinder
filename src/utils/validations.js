const validator = require("validator");
const validateSignupApi = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all required field");
  } else if (!validator.isEmail(email)) {
    throw new Error("Pleaase Enter a valid email ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  validateSignupApi,
};
