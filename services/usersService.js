const { Users } = require("../schemas");

const findUser = ({ ...arg }) => {
  return Users.findOne(arg);
};

const updateUserById = (id, data) => {
  return Users.findByIdAndUpdate(id, data);
};

const createUser = ({ ...arg }) => {
  return Users.create(arg);
};

module.exports = {
  findUser,
  updateUserById,
  createUser,
};
