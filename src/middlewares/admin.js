const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(403).json({ message: "Unauthorized" });
  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifiedUser) return res.status(403).json({ message: "Invalid token" });
  if (!verifiedUser.isAdmin)
    return res.status(403).json({ message: "You are not admin" });
  req.user = verifiedUser;
  next();
};
