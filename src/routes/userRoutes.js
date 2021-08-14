const router = require("express").Router();
const auth = require("../middlewares/auth");

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
router.get("/logout", auth, logout);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.delete("/delete", auth, deleteAccount);
router.post("/toggle-account-status/:id", toggleAccountStatus);
router.post("/toggle-admin-status/:id", toggleAdminStatus);

module.exports = router;
