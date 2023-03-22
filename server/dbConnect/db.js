const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect(process.env.db)
  .then(() => {
    console.log("connect to the database");
  })
  .catch((err) => {
    console.log(err);
    console.log("unable to connect to the database.");
  });

module.exports = dbConnect;
