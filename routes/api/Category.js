const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Category = require("../../schemas/Category");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const categories = Category.find({ user: req.user.id });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id",async (req, res) => {
  try {
    const category =await Category.findOne({
      user: req.user.id,
      _id: req.params.id,
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/",async (req, res) => {
  try {
    const category =await Category.create({...req.body,user:req.user.id});
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id",async (req, res) => {
  try {
    const category =await Category.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id",async (req, res) => {
    try {
      const category =await Category.deleteOne(
        {
          _id: req.params.id,
        }
      );
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message || error });
    }
  });

module.exports = router;
