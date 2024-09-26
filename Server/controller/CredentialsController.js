const Cred = require("../models/Credentials");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "bffyrgesfygawr47r7347r48rrcn83e3e732e";

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const cred = new Cred({ username, password: hashedPassword, role });
  cred.save();
  res.status(201).send(cred);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const cred = await Cred.findOne({ username });
  if (!cred || !(await bcrypt.compare(password, cred.password))) {
    return res.status(403).send("Invalid username or password");
  }

  const token = jwt.sign(
    { username: cred.username, fullname: cred.fullname, role: cred.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
  // res.status(200).json(cred);
};

module.exports = {
  login,
  register,
};
