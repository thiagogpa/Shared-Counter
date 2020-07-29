const { logger } = require("../config/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let User = require("../models/User");

const { PRIVATE_KEY } = require("../config");
 
// Authenticate the provided user
exports.authenticate = async (req, res) => {
  logger.trace("Calling Login Authenticate Api");

  const { username: providedUsername, password: providedPassword } = req.body;
  

  try {
    const user = await User.findOne({ username: providedUsername });
    if (!user)
      res.status(404).send({
        message: "No user was found with the provided id",
      });

    await bcrypt
      .compare(providedPassword, user.password)
      .then((match) => {
        logger.debug("Match = " + match);
        if (match) {
          //Password DID match / Issue token
          logger.debug("CREATING COOKIE");
          const payload = { providedUsername };
          const token = jwt.sign(payload, PRIVATE_KEY, {
            expiresIn: "1h",
          });
          res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .send({ message: "User authenticated, token was created" });
        } else {
          //Password did NOT match
          logger.debug("Password did not match");
          res.status(401).json({
            error: "Incorrect username or password",
          });
        }
      })
      .catch((err) => {
        logger.error(
          "Error retrieving Login with username = " + providedUsername + " error = " + err
        );
        res.status(500).send({
          message: "Error retrieving Login with username=" + providedUsername,
        });
      });
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: "Some error occurred",
      error: err.message,
    });
  }
};

// Authenticate the provided user
exports.logoff = (req, res) => {
  logger.debug("Logging Off");
  res.cookie("token", null, { httpOnly: true }).sendStatus(200);
};
