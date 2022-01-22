const express = require("express");
const router = express.Router();
const { getPosts, filterPosts } = require("../controllers/postController");
const {
  validateQueries,
  generateQueries,
} = require("../controllers/queryController");

const success = 200;

router.get("/ping", (req, res) => {
  const successObj = { success: true };
  return res.status(success).json(successObj);
});

router.get(
  "/posts",
  validateQueries,
  generateQueries,
  getPosts,
  filterPosts,
  (req, res) => {
    console.log("hello", res.locals.posts);
    return res.status(success).json({ posts: res.locals.posts });
  }
);
module.exports = router;
