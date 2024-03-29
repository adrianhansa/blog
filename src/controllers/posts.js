const Post = require("../models/Post");
const slugify = require("slugify");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).populate(
      "author",
      "fullName email"
    );
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title)
      return res
        .status(400)
        .json({ message: "Please provide a title for your post!" });
    const slug = slugify(title, { lower: true, remove: /[*+~.()'"?!:@]/g });
    const post = await Post.create({
      title,
      content,
      author: req.user.id,
      slug,
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug }).populate(
      "author",
      "fullName email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyPost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug, author: req.user.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const togglePublishPost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug, author: req.user.id },
      { published: req.body.published },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const slug = slugify(title, { lower: true, remove: /[*+~.()'"?!:@]/g });
    const post = await Post.findOneAndUpdate(
      { author: req.user.id, slug: req.params.slug },
      { title, content, published, slug },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug, author: req.user.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    await Post.findByIdAndDelete(post._id);
    res.status(200).json({ message: "Post deleted sucessfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getMyPosts,
  createPost,
  getPost,
  getMyPost,
  updatePost,
  deletePost,
  togglePublishPost,
};
