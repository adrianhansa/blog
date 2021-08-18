const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });
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
    const post = await Post.create({ title, content, author: req.user.id });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getMyPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
