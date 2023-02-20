const { Users } = require("../schemas");

const findUser = ({ ...arg }) => {
  return Users.findOne(arg);
};

const createUser = ({ ...arg }) => {
  return Users.create(arg);
};

module.exports = {
  findUser,
  createUser,
};
