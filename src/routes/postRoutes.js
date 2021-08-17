const router = require("express").Router();
const {
  getAllPosts,
  getMyPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.get("/all-posts", getAllPosts);
router.get("/my-posts", getMyPosts);
router.get("/posts/:slug", getPost);
router.post("/posts", createPost);
router.put("/posts/:slug", updatePost);
router.delete("/posts/:slug", deletePost);

module.exports = router;
