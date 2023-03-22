const express = require("express");
const auth = require("../auth");
const router = express.Router();

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const {
  CreatePost,
  GetPost,
  getSinglePost,
  editPost,
  deletePost,
} = require("../controllers/post");

router
  .route("/create")
  .post(auth, uploadMiddleware.single("file"), CreatePost)
  .get(GetPost);

router
  .route("/create/:id")
  .get(getSinglePost)
  .patch(auth, uploadMiddleware.single("file"), editPost)
  .delete(auth, deletePost);

module.exports = router;
