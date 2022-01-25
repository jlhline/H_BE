const cacheController = {};
const redisClient = require("../helpers/redisConnect");
cacheController.cacheChecks = async (req, res, next) => {
  let cacheChecks = res.locals.tags.map((tag) => {
    return redisClient.client.exists(tag);
  });
  try {
    res.locals.checks = await Promise.all(cacheChecks);
    next();
  } catch (err) {
    return next({ error: err });
  }
};
cacheController.addToCache = (req, res, next) => {
  try {
    res.locals.checks.forEach((cacheHit, index) => {
      if (cacheHit === 0) {
        redisClient.client.set(
          res.locals.tags[index],
          JSON.stringify(res.locals.responses[index].data.posts)
        );
      }
    });
    next();
  } catch (err) {
    return next({ error: err });
  }
};
module.exports = cacheController;
