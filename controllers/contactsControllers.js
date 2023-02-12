const {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../service");

const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  const response = await createContact({ name, email, phone, favorite });
  res.status(201).json(response);
};

const deleteContactByIdController = async (req, res) => {
  const { id } = req.params;
  const response = await removeContact(id);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const changeContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const response = await updateContact(id, body);

  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(response);
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const response = await updateStatusContact(id, body);

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
