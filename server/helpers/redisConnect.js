const redisConnect = {};
const redis = require("redis");
redisConnect.client = redis.createClient();
//Controller to connect redis server on startup with redis client
//this client's methods will be accessed in other functions
redisConnect.connectToRunningServer = async (notify) => {
  redisConnect.client.on("error", (err) => {
    console.log("Redis client error", err);
  });
  await redisConnect.client.connect();
  notify();
};

module.exports = redisConnect;
