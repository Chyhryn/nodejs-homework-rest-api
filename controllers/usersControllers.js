const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { usersService } = require("../services");

const salt = Number(process.env.SALT);

function generateToken(data) {
  const dataForToken = { data };
  return jwt.sign(dataForToken, "secret", { expiresIn: "2h" });
}

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await usersService.findUser({ email });
  if (checkUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = bcrypt.hashSync(password, salt, function (err) {
    return res.status(400).json({ message: err.message });
  });

  const user = await usersService.createUser({
    ...req.body,
    password: hashPassword,
  });
  if (!user) {
    return res.status(400).json({ message: "Can`t create user!" });
  }

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findUser({ email });
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!user || !comparePassword) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = generateToken(user._id);
  user.token = token;

  const updateUserWithToken = await user.save();

  if (!updateUserWithToken) {
    return res.status(400).json({ message: "Can`t save token" });
  }

  res.status(200).json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logoutUser = async (req, res) => {
  const id = req.user;

  const user = await usersService.findUser({ _id: id });
  if (!user) {
    return res.status(401).json("Not authorized");
  }

  user.token = null;
  const updatedUserWithoutToken = await user.save();
  if (!updatedUserWithoutToken) {
    return res.status(400).json({ message: "Can`t delete token" });
  }

  res.status(204).json({ message: "No Content" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
