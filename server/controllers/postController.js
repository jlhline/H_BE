const postController = {};
const axios = require("axios");
const apiString = "https://api.hatchways.io/assessment/blog/posts?";
const optionalString = "";
postController.getPosts = (req, res, next) => {
  const { tags, sortBy, direction } = req.query;
  //optionalString = `&sortBy=${sortBy}`;
  if (tags) {
    tags.split(",").forEach((tag) => {
      axios
        .get(`${apiString}tag=${tag}`)
        .then((data) => {
          console.log(data);
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
