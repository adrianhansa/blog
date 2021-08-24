const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getAllPosts,
  getMyPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getMyPost,
  togglePublishPost
} = require("../controllers/posts");

router.post("/posts", auth, createPost);
router.get("/posts", getAllPosts);
router.put("/posts/:slug", auth, updatePost);
router.get("/posts/:slug", getPost);
router.get("/admin/posts", auth, getMyPosts);
router.get("/admin/posts/:slug", auth, getMyPost);
router.put("/admin/posts/:slug",auth,togglePublishPost)
router.delete("/posts/:slug", auth, deletePost);

module.exports = router;
