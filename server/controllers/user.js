const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, password } = req.body;

  let userCheck = await User.findOne({ username });
  if (userCheck) {
    return res
      .status(400)
      .send({ message: "User with provided username already exist" });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "user sucessfully registerd.",
            result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error registering user",
            Error: err,
          });
        });
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error while hashing password",
        Error: err,
      });
    });
};

const Login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) {
          throw err;
        }

        const token = jwt.sign(
          {
            ID: user._id,
            username: username,
          },
          "RANDOM-TOKEN",
          {
            expiresIn: "24h",
          }
        );

        if (data) {
          return res.status(200).send({
            message: "Login sucess",
            username: username,
            token,
          });
        } else {
          return res.status(401).send({
            message: "Invalid Credentials",
          });
        }
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "User doesnot exist.",
        err,
      });
    });
};

const Profile = (req, res) => {
  res.send({
    message: "you are authorized to acess",
    user: req.user,
  });
};

module.exports = { Login, Register, Profile };
