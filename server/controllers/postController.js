const postController = {};
const axios = require("axios");

postController.getPosts = async (req, res, next) => {
  let apiCalls = res.locals.queries.map((queryString) => {
    return axios.get(queryString);
  });

  try {
    res.locals.responseToSort = await Promise.all(apiCalls);
    next();
  } catch (err) {
    return next({ error: err });
  }
};

postController.sortPosts = (req, res, next) => {
  let seenSet = new Set();
  let posts = [];
  try {
    res.locals.responseToSort.forEach((response) => {
      response.data.posts.forEach((post) => {
        if (!seenSet.has(post.id)) {
          seenSet.add(post.id);
          posts.push(post);
        }
      });
    });
    seenSet.clear();
    res.locals.posts = posts;
    next();
  } catch (err) {
    return next({ error: err });
  }
};

module.exports = postController;
