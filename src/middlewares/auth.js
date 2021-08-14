const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("token");
  const userVerified = jwt.verify(token, process.env.JWT_SECRET);
  console.log(userVerified);
  req.user = userVerified.id;
  next();
};

module.exports = auth;
