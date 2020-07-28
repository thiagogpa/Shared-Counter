const { logger } = require("../config/logger");
const uuid = require("uuid");
const { check, validationResult } = require("express-validator");
let User = require("../models/User");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
  logger.trace("Calling User Creation Api");

  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    const user = await User.findOne({ email: newUser.email });
    if (user != null)
      res.status(409).send({
        message: "User e-mail already in use, please inform an unique email",        
      });

    const saltRounds = 10;
    await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(newUser.password, salt);
      })
      .then((hash) => {
        newUser.password = hash;
      })
      .catch((err) => {
        logger.error(`Error while creating hash: ${err.message}`);
        return res.status(500).send({
          message: "Some error occurred",
          error: err.message,
        });
      });

    const createdUser = await newUser.save();

    res.send(createdUser);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Retrieve all User from the database.
exports.findAll = async (req, res) => {
  logger.trace("Calling User FindAll Api");

  try {
    const UserDb = await User.find();
    res.send(UserDb);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  logger.trace("Calling User FindOne Api");

  const userID = req.params.id;

  try {
    const user = await User.findById(userID);
    if (!user)
      res.status(404).send({
        message: "No user was found with the provided id",
      });
    else res.send(user);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  logger.trace("Calling User update Api");

  const userID = req.params.id;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userForUpdate = await User.findById(userID);

    if (!userForUpdate)
      return res.status(404).send({
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

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  logger.trace("Calling User Delete Api");

  const userID = req.params.id;

  try {
    const userDeleted = await User.findByIdAndRemove({ _id: userID });

    if (!userDeleted)
      return res.status(404).send({
        message: "No user was found with the provided id",
      });
    else
      return res.status(200).send({
        message: "User deleted",
      });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};
