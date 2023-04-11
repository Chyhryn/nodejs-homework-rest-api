const express = require("express");

const router = express.Router();
const { usersControllers } = require("../../controllers");

const {
  userValidationMiddleware,
  authValidationMiddleware,
  upload,
  emailValidation,
} = require("../../middlewares");
const { sendEmail } = require("../../helpers");

router.post(
  "/register",
  authValidationMiddleware,
  usersControllers.registerUser
);

router.post("/login", authValidationMiddleware, usersControllers.loginUser);

router.get("/logout", userValidationMiddleware, usersControllers.logoutUser);

router.get("/verify/:verificationToken", usersControllers.userVerification);

router.post("/verify", emailValidation, usersControllers.verificationRequest);

router.patch(
  "/avatars",
  userValidationMiddleware,
  upload.single("avatar"),
  usersControllers.changeAvatar
);

module.exports = {
  usersRouter: router,
};
