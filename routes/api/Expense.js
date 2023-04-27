const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Expense = require("../../schemas/Expense");

const router = express.Router();

router.get("/",async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate("categories");
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id", async(req, res) => {
  try {
    const expense =await Expense.findOne({
      user: req.user.id,
      _id: req.params.id,
    }).populate("categories");
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/", async(req, res) => {
  try {
    const expense =await Expense.create({...req.body,user:req.user.id});
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id",async (req, res) => {
  try {
    const expense =await Expense.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id",async (req, res) => {
    try {
      const expense =await Expense.deleteOne(
        {
          _id: req.params.id,
        }
      );
      res.json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message || error });
    }
  });

module.exports = router;
