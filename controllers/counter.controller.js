const { logger } = require("../config/logger");
const { check, validationResult } = require("express-validator");
let Counter = require("../models/Counter");

// Create and Save a new Counter
exports.create = async (req, res) => {
  logger.trace("Calling Add Counter");

  try {
    const newCounter = new Counter({
      code: req.body.code,
      counter: 0
    });

    const counter = await Counter.findOne({ code: newCounter.code });
    if (counter != null) {
      res.status(409).send({
        message: "Code is already in use, inform a different one",
      });
    } else {
      const createdCounter = await newCounter.save();

      res.send(createdCounter);
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Find a Counter by its Code
exports.findOne = async (req, res) => {
  logger.trace("Calling Find Counter");

  const counterCode = req.params.code;

  try {
    const counter = await Counter.findOne({ code: counterCode });
    if (!counter)
      res.status(404).send({
        message: "No counter was found with the provided code",
      });
    else res.send(counter);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Update a Counter by the code in the request
exports.update = async (req, res) => {
  logger.trace("Calling User update Api");

  const counterCode = req.params.code;
  const email = req.body.email;

  try {
    const userForUpdate = await User.findById(userID);

    if (!userForUpdate)
      res.status(404).send({
        message: "No user was found with the provided id",
      });

    userForUpdate.password = password;
    userForUpdate.email = email;

    await userForUpdate.save();

    res.send(userForUpdate);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};
