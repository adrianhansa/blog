const jwt = require("jsonwebtoken");

module.exports = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      fullName: user.fullName,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  res.status(statusCode).header("token", token).json({ isAuth: true, token });
};
