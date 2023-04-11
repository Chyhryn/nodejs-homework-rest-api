const bcrypt = require("bcrypt");
const { usersService } = require("../services");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { sendEmail, generateToken } = require("../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = Number(process.env.SALT);

  const checkUser = await usersService.findUser({ email });
  if (checkUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, salt, function (err) {
    return res.status(400).json({ message: err.message });
  });

  const verificationToken = uuidv4();

  const user = await usersService.createUser({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  if (!user) {
    return res.status(400).json({ message: "Can`t create user!" });
  }

  const msg = {
    to: email,
    subject: "Registration confirmation",
    html: `Please confirm your email by clicking this <a target="_blank" href="http://localhost:8080/api/users/verify/${verificationToken}">link</a>`,
  };
  await sendEmail(msg);

  res.status(201).json({
    user: {
      email: user.email,
      avatarURL: user.avatarURL,
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

  if (!user.verify) {
    return res.status(401).json({
      message: "Not verified user",
    });
  }

  const token = generateToken(user._id);
  user.token = token;
  user.verificationToken = "verified";

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

const userVerification = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await usersService.findUser({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const id = { _id: user._id };
  const data = { verify: true, verificationToken: null };

  const updateUser = await usersService.updateUserById(id, data);

  if (!updateUser) {
    return res.status(400).json({ message: "Can`t update user" });
  }

  res.status(200).json({
    message: "Verification successful",
  });
};

const verificationRequest = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findUser({ email });

  if (!user) {
    return res.status(401).json({ message: "Email is wrong" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const msg = {
    to: email,
    subject: "Registration confirmation",
    html: `Please confirm your email by clicking this <a target="_blank" href="http://localhost:8080/api/users/verify/${user.verificationToken}">link</a>`,
  };

  await sendEmail(msg);

  res.status(200).json({
    message: "Verification email sent",
  });
};

const changeAvatar = async (req, res) => {
  const id = req.user;

  try {
    const tempAvatarPath = req.file.path;
    const newAvatarPath = path.join("public/avatars", req.file.filename);

    const avatar = await Jimp.read(tempAvatarPath);
    avatar.resize(250, 250).quality(60);
    await avatar.writeAsync(tempAvatarPath);

    await fs.rename(tempAvatarPath, newAvatarPath);

    const user = await usersService.findUser({ _id: id });
    user.avatarURL = newAvatarPath;

    const updateUserAvatar = await user.save();

    if (!updateUserAvatar) {
      return res.status(400).json({ message: "Can`t save avatar" });
    }

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userVerification,
  verificationRequest,
  changeAvatar,
};
