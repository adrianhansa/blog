const router = require("express").Router();
const {
  register,
  login,
  logout,
  users,
  getProfile,
  updateProfile,
  deleteAccount,
  toggleAccountStatus,
} = require("../controllers/users");

router.get("/", users);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.getProfile("/profile", getProfile);
router.put("/profile", updateProfile);
router.deleteAccount("/delete", deleteAccount);
router.post("/toggle-account-status/:id", toggleAccountStatus);

module.exports = router;
