const Post = require("../models/Post");
const fs = require("fs");

const CreatePost = async (req, res) => {
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;

  const createPost = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    author: req.user.ID,
  });

  res.status(201).json({ createPost });
};

const GetPost = async (req, res) => {
  const getpost = await Post.find().populate("author", ["username"]);
  res.status(201).json({ getpost });
};

const getSinglePost = async (req, res) => {
  const { id: singlePostId } = req.params;
  const singlePost = await Post.find({ _id: singlePostId }).populate("author", [
    "username",
  ]);

  res.status(201).send({ singlePost });
};

const editPost = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id: editPostId } = req.params;
  const { content, summary, title, _id } = req.body;

  const editPost = await Post.findById({ _id: editPostId });

  const isAuthor =
    JSON.stringify(editPost?.author._id) === JSON.stringify(req.user.ID);

  if (!isAuthor) {
    return res.status(500).json({
      message: "You are not the author of this post.",
    });
  }

  await editPost.update({
    title,
    content,
    summary,
    cover: newPath ? newPath : editPost.cover,
  });

  res.status(201).send({ editPost });
};

const deletePost = async (req, res) => {
  const { id: deletePost } = req.params;

  const userCheck = await Post.findById({ _id: deletePost });

  const isAuthor =
    JSON.stringify(userCheck?.author?._id) === JSON.stringify(req?.user?.ID);

  if (!isAuthor) {
    return res.status(500).json({
      message: "You are not the author of this post.",
    });
  }

  await userCheck.delete();

  res.status(200).json({ userCheck });
};

module.exports = { CreatePost, GetPost, getSinglePost, editPost, deletePost };
