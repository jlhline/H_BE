const express = require("express");
const app = express();

const apiRouter = require("./routes/api.js");

app.use("/api", apiRouter);
app.use(express.json());

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught an unknown middleware error",
    status: 400,
    message: { error: "An error occurred." },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res
    .status(errorObj.status)
    .send({ error: errorObj.message.error })
    .json();
});

module.exports = app;
