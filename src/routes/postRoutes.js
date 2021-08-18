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
router.get("/posts/all", getAllPosts);
router.get("/posts/my-posts", auth, getMyPosts);
router.get("/posts/:slug", getPost);
router.put("/posts/:slug", auth, updatePost);
router.delete("/posts/:slug", auth, deletePost);

module.exports = router;
