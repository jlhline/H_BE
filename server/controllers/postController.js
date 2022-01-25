const postController = {};
const axios = require("axios");
const redisClient = require("../helpers/redisConnect");

postController.getPosts = async (req, res, next) => {
  let apiOrCache = res.locals.queries.map((queryString, index) => {
    try {
      if (res.locals.checks[index] === 0) {
        return axios.get(queryString);
      } else {
        return redisClient.client.get(res.locals.tags[index]);
      }
    } catch (err) {
      return err;
    }
  });

  try {
    res.locals.responses = await Promise.all(apiOrCache);
    next();
  } catch (err) {
    console.log(err);
    return next({ error: err });
  }
};

postController.filterPosts = (req, res, next) => {
  let seenSet = new Set();
  let posts = [];
  try {
    res.locals.responses.forEach((response, index) => {
      if (typeof response === "object") {
        response.data.posts.forEach((post) => {
          if (!seenSet.has(post.id)) {
            seenSet.add(post.id);
            posts.push(post);
          }
        });
      } else {
        JSON.parse(response).forEach((post) => {
          if (!seenSet.has(post.id)) {
            seenSet.add(post.id);
            posts.push(post);
          }
        });
      }
    });

    seenSet.clear();
    res.locals.posts = posts;
    next();
  } catch (err) {
    return next({ error: err });
  }
};

postController.sortPosts = (req, res, next) => {
  let { sortBy, direction } = req.query;
  try {
    if (!sortBy) sortBy = "id";
    if (!direction) direction = "asc";
    if (direction === "asc") {
      res.locals.posts.sort((a, b) => {
        return a[sortBy] - b[sortBy];
      });
    } else {
      res.locals.posts.sort((a, b) => {
        return b[sortBy] - a[sortBy];
      });
    }
    next();
  } catch (err) {
    return next({ error: err });
  }
};

module.exports = postController;
