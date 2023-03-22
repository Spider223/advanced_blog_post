const express = require("express");
require("dotenv").config();
const dbConnect = require("./dbConnect/db");
const user = require("./routes/user");
const post = require("./routes/post");
const cors = require("cors");
const app = express();

const port = process.env.port || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", user);
app.use("/api/v1/post", post);

app.use("/uploads", express.static(__dirname + "/uploads"));

dbConnect;
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
