const postController = {};
const axios = require("axios");

postController.getPosts = (req, res, next) => {
  const { tags } = req.query;
  if (tags) {
    tags.split(",").forEach((tag) => {
      axios
        .get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
        .then((data) => {
          res.locals.posts = data.data.posts;
          next();
        })
        .catch((err) => next(err));
    });
  } else {
    return next();
  }
};

postController.sortPosts = (req, res, next) => {};

module.exports = postController;
