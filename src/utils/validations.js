const validator = require("validator");
const bcrypt = require("bcrypt");
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

const profileEditValidations = (req) => {
  const allowed_updates = ["age", "about", "skills", "gender", "photoUrl"];
  const isAllowedUdate = Object.keys(req.body).every((field) =>
    allowed_updates.includes(field),
  );

  return isAllowedUdate;
};

const resetPasswordValidation = async (req, hashedPass) => {
  const { currentPassword, newPassword, newPasswoed } = req.body;
  const passwordToSet = newPassword ?? newPasswoed;

  if (!currentPassword || !passwordToSet) {
    throw new Error("Please provide both current and new password");
  }

  const isCurrentPassMatch = await bcrypt.compare(currentPassword, hashedPass);
  if (!validator.isStrongPassword(passwordToSet)) {
    throw new Error("New password is not strong");
  } else if (!isCurrentPassMatch) {
    throw new Error("Current password is not matched");
  }
};

module.exports = {
  validateSignupApi,
  profileEditValidations,
  resetPasswordValidation,
};
