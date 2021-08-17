const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken");

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
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Invalid email/password" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified)
      return res.status(400).json({ message: "Invalid email/password" });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ isAuth: false });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const users = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.user.id);
    if (!userDeleted)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleAccountStatus = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { isActive } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleAdminStatus = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { isAdmin } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isAdmin },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, password, passwordVerify } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res(404).json({ message: "User not found" });
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already in use." });
      if (!password || password.length < 6) {
        const user = await User.findByIdAndUpdate(
          req.user.id,
          { fullName, email },
          { new: true }
        ).select("-password");
        res.status(200).json(user);
      }
      if (password > 6 && password === passwordVerify) {
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(
          req.user.id,
          { fullName, password: passwordHashed, email },
          { new: true }
        ).select("-password");
        res.status(200).json(user);
      }
    }
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
  toggleAdminStatus,
  getProfile,
  updateProfile,
};
