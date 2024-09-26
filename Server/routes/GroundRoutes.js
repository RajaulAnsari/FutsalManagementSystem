const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const {
  save,
  getData,
  findById,
  deleteById,
  updateById,
} = require("../controller/GroundController");

const { authToken } = require("../authentication/Auth");

router.get("/", getData);

router.post("/", authToken, upload.single("image"), save); //authToken,

router.get("/:id", authToken, findById);

router.delete("/:id", authToken, deleteById); //authToken

router.put("/:id", authToken, upload.single("image"), updateById);

module.exports = router;
