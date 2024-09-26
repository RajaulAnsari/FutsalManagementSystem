const mongoose = require("mongoose");

const credSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Cred = mongoose.model("credentials", credSchema);

module.exports = Cred;
