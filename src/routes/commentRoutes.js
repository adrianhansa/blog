const router = require("express").Router();
const {
  createComment,
  getComment,
  getComments,
  toggleApprovedStatus,
  deleteComment,
} = require("../controllers/comments");
const admin = require("../middlewares/admin");

router.post("/posts/comments", createComment);
router.get("/posts/:slug/comments", getComments);
router.get("/posts/:slug/comments/:id", admin, getComment);
router.put("/posts/:slug/comments/:id", admin, toggleApprovedStatus);
router.delete("/posts/:slug/comments/:id", admin, deleteComment);

module.export = router;
