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

router.post("/", auth, createPost);
router.get("/all", getAllPosts);
router.get("/my-posts", auth, getMyPosts);
router.get("/:slug", getPost);
router.put("/:slug", auth, updatePost);
router.delete("/:slug", auth, deletePost);

module.exports = router;
