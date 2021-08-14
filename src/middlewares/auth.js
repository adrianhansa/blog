const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("token");
  const userVerified = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userVerified;
  next();
};

module.exports = auth;
