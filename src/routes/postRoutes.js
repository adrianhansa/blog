const router = require("express").Router();
const {
  getAllPosts,
  getMyPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.post("/", createPost);
router.get("/all", getAllPosts);
router.get("/my-posts", getMyPosts);
router.get("/:slug", getPost);
router.put("/:slug", updatePost);
router.delete("/:slug", deletePost);

module.exports = router;
