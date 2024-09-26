const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Ground = mongoose.model("grounds", groundSchema);

module.exports = Ground;
