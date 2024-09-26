const express = require("express");
const router = express.Router();

const {
  getData,
  findById,
  deleteById,
  updateById,
  login,
  register,
} = require("../controller/CustomerController");

const customerValidate = require("../validation/CustomerValidation");

router.get("/", getData); //authToken,

router.get("/:id", findById); //authToken,

router.delete("/:id", deleteById);

router.put("/:id", updateById);

router.post("/login", login);

router.post("/register", customerValidate, register);

module.exports = router;
