const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "bffyrgesfygawr47r7347r48rrcn83e3e732e";
const { sendMail, sendEmail } = require("../EmailService/Mailing");

const getData = async (req, res) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const findById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json(customer);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Successfully");
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const updateById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(customer);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, fullname, contact } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({
      email,
      password: hashedPassword,
      fullname,
      contact,
    });
    customer.save();
    await sendEmail(
      email,
      "Customer Registration",
      `<h1>Registration Successful</h1><p>Your user ID is ${customer._id}</p>`
    );
    res.status(201).json({ message: "Registration Successful", customer });
  } catch (e) {
    console.error("Error during registration:", e.message);
    res.status(500).json({ error: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });
  if (!customer || !(await bcrypt.compare(password, customer.password))) {
    return res.status(403).send("Invalid username or password");
  }

  const token = jwt.sign(
    {
      email: customer.email,
      fullname: customer.fullname,
      role: customer.role,
      id: customer._id,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
  // res.status(200).json(customer);
};

module.exports = {
  getData,
  findById,
  deleteById,
  updateById,
  register,
  login,
};
