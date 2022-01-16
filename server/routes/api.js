const express = require("express");
const router = express.Router();
const { getPosts, sortPosts } = require("../controllers/postController");
const success = 200;

router.get("/ping", (req, res) => {
  const successObj = { success: true };
  return res.status(success).json(successObj);
});

router.get("/posts", getPosts, (req, res) => {
  return res.status(success).json({ posts: res.locals.posts });
});
module.exports = router;
