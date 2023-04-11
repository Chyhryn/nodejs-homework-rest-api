const userValidationMiddleware = require("./userValidationMiddleware");
const validationMiddleware = require("./validationMiddleware");
const authValidationMiddleware = require("./authValidationMiddleware");
const upload = require("./multerMiddleware");
const emailValidation = require("./emailValidation");

module.exports = {
  userValidationMiddleware,
  validationMiddleware,
  authValidationMiddleware,
  upload,
  emailValidation,
};
