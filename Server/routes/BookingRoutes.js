const express = require("express");
const router = express.Router();

const { save, getData } = require("../controller/BookingController");

router.post("/", save); //authToken, userValidate,

router.get("/", getData); //authToken,

module.exports = router;
