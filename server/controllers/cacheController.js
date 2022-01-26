const cacheController = {};
const redisClient = require("../helpers/redisConnect");
const cachePostExpiration = 600;
//A controller to return an array of the current existences of an api call in the cache
//For each tag it will return a 0 if it is not in cache or 1 if it is
cacheController.cacheChecks = async (req, res, next) => {
  if (redisClient.client.connected) {
    let cacheChecks = res.locals.tags.map((tag) => {
      return redisClient.client.exists(tag);
    });
    try {
      res.locals.checks = await Promise.all(cacheChecks);
      next();
    } catch (err) {
      return next({ error: err });
    }
  } else next();
};
//A controller to add the result of an api call to the cache if it doesn't already exist
//there, post expiration can be set to avoid invalid cache contents(i.e. a new post under
//tag 'science' is added to DB after that returned call has been cached)
//The next call after expiration will refresh the cache with updated data
cacheController.addToCache = (req, res, next) => {
  if (redisClient.client.connected) {
    try {
      res.locals.checks.forEach((cacheHit, index) => {
        if (cacheHit === 0) {
          redisClient.client.setex(
            res.locals.tags[index],
            cachePostExpiration,
            JSON.stringify(res.locals.responses[index].data.posts)
          );
        }
      });
      next();
    } catch (err) {
      return next({ error: err });
    }
  } else next();
};
module.exports = cacheController;
