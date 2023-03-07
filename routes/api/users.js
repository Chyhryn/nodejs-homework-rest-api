const express = require("express");

const router = express.Router();
const { usersControllers } = require("../../controllers");

const {
  userValidationMiddleware,
  authValidationMiddleware,
  upload,
} = require("../../middlewares");

router.post(
  "/register",
  authValidationMiddleware,
  usersControllers.registerUser
);

router.post("/login", authValidationMiddleware, usersControllers.loginUser);

router.get("/logout", userValidationMiddleware, usersControllers.logoutUser);

router.patch(
  "/avatars",
  userValidationMiddleware,
  upload.single("avatar"),
  usersControllers.changeAvatar
);

module.exports = {
  usersRouter: router,
};
