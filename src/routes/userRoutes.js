const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const {
  register,
  login,
  logout,
  users,
  getProfile,
  updateProfile,
  deleteAccount,
  toggleAccountStatus,
  toggleAdminStatus,
} = require("../controllers/users");

router.get("/", users);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.delete("/delete", auth, deleteAccount);
router.put("/toggle-account-status/:id", admin, toggleAccountStatus);
router.put("/toggle-admin-status/:id", admin, toggleAdminStatus);

module.exports = router;
