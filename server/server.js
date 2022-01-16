const express = require("express");
const app = express();
const PORT = 3000;

const apiRouter = require("./routes/api.js");

app.use("/api", apiRouter);
app.use(express.json());
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught an unknown middleware error",
    status: 400,
    message: { err: "An error occurred." },
  };
  const errorObj = Object.assign({}, defaultErr, err);

  return res.status(errorObj.status).send(errorObj.message).json();
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
