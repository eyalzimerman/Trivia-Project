const express = require("express");
const app = require("./app");
const path = require("path");
const PORT = 8080;

app.use(express.static(path.join(__dirname, "build")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build"));
});

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
