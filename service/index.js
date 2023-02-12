const Contacts = require("../schemas/contacts");

const getAllContacts = async () => {
  return Contacts.find({});
};

const getContactById = (id) => {
  return Contacts.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contacts.create({ name, email, phone, favorite });
};

const removeContact = (id) => {
  return Contacts.findByIdAndRemove({ _id: id });
};

const updateContact = (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateStatusContact = (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
