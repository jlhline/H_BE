const express = require("express");
const router = express.Router();
const {
  getPosts,
  filterPosts,
  sortPosts,
} = require("../controllers/postController");
const {
  validateQueries,
  generateQueries,
} = require("../controllers/queryController");

const { cacheChecks, addToCache } = require("../controllers/cacheController");

const success = 200;

router.get("/ping", (req, res) => {
  const successObj = { success: true };
  return res.status(success).json(successObj);
});

router.get(
  "/posts",
  validateQueries,
  generateQueries,
  cacheChecks,
  getPosts,
  addToCache,
  filterPosts,
  sortPosts,
  (req, res) => {
    return res.status(success).json({ posts: res.locals.posts });
  }
);
module.exports = router;
