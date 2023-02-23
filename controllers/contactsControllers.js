const { contactsService } = require("../services");

const getContactsController = async (req, res) => {
  const owner = req.user;
  const contacts = await contactsService.getAllContacts(owner);
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const owner = req.user;
  const contact = await contactsService.getContactById(id, owner);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  const owner = req.user;
  const response = await contactsService.createContact(
    name,
    email,
    phone,
    favorite,
    owner
  );
  res.status(201).json(response);
};

const deleteContactByIdController = async (req, res) => {
  const { id } = req.params;
  const owner = req.user;
  const response = await contactsService.removeContact(id, owner);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const changeContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const owner = req.user;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const response = await contactsService.updateContact(id, owner, body);

  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(response);
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const owner = req.user;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const response = await contactsService.updateStatusContact(id, owner, body);

  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(response);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  changeContactByIdController,
  updateStatusContactController,
};
