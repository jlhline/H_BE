const app = require("./server.js");
const redisConnect = require("./helpers/redisConnect.js");
const PORT = 3000;
const redisPort = 6379;

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});

redisConnect.connectToRunningServer(() => {
  console.log(`Redis server listening on default port: ${redisPort}`);
});

module.exports = app;
