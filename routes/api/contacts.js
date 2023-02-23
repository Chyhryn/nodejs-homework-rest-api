const express = require("express");
const {
  userValidationMiddleware,
  validationMiddleware,
} = require("../../middlewares");

const { contactsControllers } = require("../../controllers");

const router = express.Router();

router.get(
  "/",
  userValidationMiddleware,
  contactsControllers.getContactsController
);

router.get(
  "/:id",
  userValidationMiddleware,
  contactsControllers.getContactByIdController
);

router.post(
  "/",
  userValidationMiddleware,
  validationMiddleware.addContactValidation,
  contactsControllers.addContactController
);

router.delete(
  "/:id",
  userValidationMiddleware,
  contactsControllers.deleteContactByIdController
);

router.put(
  "/:id",
  userValidationMiddleware,
  validationMiddleware.changeContactByIdValidation,
  contactsControllers.changeContactByIdController
);

router.patch(
  "/:id/favorite",
  userValidationMiddleware,
  contactsControllers.updateStatusContactController
);

module.exports = { contactsRouter: router };
