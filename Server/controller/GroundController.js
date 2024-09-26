const Ground = require("../models/Ground");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const Cred = require("../models/Credentials");

const save = async (req, res) => {
  try {
    const { name, description } = req.body;
    const ground = new Ground({
      name,
      description,
      image: req.file.originalname,
    });
    await ground.save();
    res.status(201).json(ground);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const getData = async (req, res) => {
  try {
    const ground = await Ground.find();
    res.status(200).json(ground);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const findById = async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);
    res.status(200).json(ground);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const ground = await Ground.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Successfully");
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
};

const updateById = async (req, res) => {
  try {
    const groundId = req.params.id;
    const { name, description } = req.body;

    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    ground.name = name || ground.name;
    ground.description = description || ground.description;

    if (req.file) {
      ground.image = req.file.filename;
    }

    await ground.save();
    res.json(ground);
  } catch (error) {
    console.error("Error updating ground:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  save,
  getData,
  findById,
  deleteById,
  updateById,
};
