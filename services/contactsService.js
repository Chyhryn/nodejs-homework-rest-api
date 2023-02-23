const { Contacts } = require("../schemas");

const getAllContacts = async (owner) => {
  return Contacts.find({ owner });
};

const getContactById = (id, owner) => {
  return Contacts.findOne({ _id: id, owner });
};

const createContact = (name, email, phone, favorite, owner) => {
  return Contacts.create({ name, email, phone, favorite, owner });
};

const removeContact = (id, owner) => {
  return Contacts.findByIdAndRemove({ _id: id, owner });
};

const updateContact = (id, owner, body) => {
  return Contacts.findByIdAndUpdate({ _id: id, owner }, body, { new: true });
};

const updateStatusContact = (id, owner, body) => {
  return Contacts.findByIdAndUpdate({ _id: id, owner }, body, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
