const { logger } = require("../config/logger");
const uuid = require("uuid");
const { check, validationResult } = require("express-validator");
let User = require("../models/User");
let Group = require("../models/Group");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
  logger.trace("Calling User Creation Api");

  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const user = await User.findOne({ username: newUser.username });
    if (user != null)
      return res.status(409).send({
        message: "User e-mail already in use, please inform an unique username",
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

  const { username: userID, group: groupName } = req.body;

  try {
    const userForUpdate = await User.findById(userID);

    if (!userForUpdate)
      res.status(404).send({
        message: "No user was found with the provided id",
      });

    userForUpdate.group = password;

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
      res.status(404).send({
        message: "No user was found with the provided id",
      });
    else
      res.status(200).send({
        message: "User deleted",
      });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Update a User by the id in the request
exports.addToGroup = async (req, res) => {
  logger.trace("Calling User Add to Group Api");

  try {
    const newGroup = new Group({
      group: req.body.group,
    });



    const providedUsername = req.params.id;

    const user = await User.findOne({ username: providedUsername })
    user.groups.push(newGroup)

    //user.groups = newGroup;

    const updatedUser = await user.save();
    
    res.send(updatedUser);

  } catch (err) {
    logger.error(err);
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};
