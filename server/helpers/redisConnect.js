const redisConnect = {};
const redis = require("redis");
redisConnect.client = redis.createClient();

redisConnect.connectToRunningServer = async (notify) => {
  redisConnect.client.on("error", (err) => {
    console.log("Redis client error", err);
  });
  await redisConnect.client.connect();
  notify();
};

module.exports = redisConnect;
