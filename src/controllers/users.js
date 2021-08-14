const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { fullName, email, password, passwordVerify } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required." });
    //check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message:
          "There is already an acoount registered with this email. Please login.",
      });
    //check for password length
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must contain at least 6 characters." });
    //check for password verify
    if (password !== passwordVerify)
      return res.status({ message: "The two passwords are not identical." });
    //hashing the password
    const passwordHashed = await bcrypt.hash(password, 10);
    //create the user
    const user = await User.create({
      fullName,
      email,
      password: passwordHashed,
    });
    //send the token
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const users = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleAccountStatus = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  users,
  deleteAccount,
  toggleAccountStatus,
  getProfile,
  updateProfile,
};
