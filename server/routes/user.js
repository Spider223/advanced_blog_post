const express = require("express");
const auth = require("../auth");

const router = express.Router();

const { Login, Register, Profile } = require("../controllers/user");

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/profile").get(auth, Profile);

module.exports = router;
