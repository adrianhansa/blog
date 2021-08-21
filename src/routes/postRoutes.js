const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getAllPosts,
  getMyPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.post("/posts", auth, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:slug", getPost);
router.get("/admin/posts", auth, getMyPosts);
router.put("/posts/:slug", auth, updatePost);
router.delete("/posts/:slug", auth, deletePost);

module.exports = router;
