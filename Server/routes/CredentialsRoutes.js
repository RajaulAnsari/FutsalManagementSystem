const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/CredentialsController");
const { authToken } = require("../authentication/Auth");

router.post("/login", login);

router.post("/register", authToken, register);

module.exports = router;
