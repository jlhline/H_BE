const redisConnect = {};
const redis = require("redis");

redisConnect.connectToRunningServer = async (port, notify) => {
  const client = redis.createClient(port);
  client.on("error", (err) => {
    console.log("Redis client error", err);
  });
  await client.connect();
  notify();
};

module.exports = redisConnect;
