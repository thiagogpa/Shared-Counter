module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const { check, validationResult } = require("express-validator");
  var router = require("express").Router();

  // Create a new User
  router.post(
    "/",
    [
      check("email", "e-mail is required").not().isEmpty(),
      check("password", "Password is required").not().isEmpty(),
      check("password", "Password size must be 3-20 chars").isLength({
        min: 3,
        max: 20,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).send({
          message: "Validation error",
          error: errors.array(),
        });
      }
      res.json(await user.create(req, res));
    }
  );

  // Retrieve all Users
  router.get("/", async (req, res) => {
    res.json(await user.findAll(req, res));
  });

  // Retrieve a single User by ID
  router.get("/:id", async (req, res) => {
    res.json(await user.findOne(req, res));
  });

  // Update a User by id
  router.put(
    "/:id",
    [
      check("email", "e-mail is required").not().isEmpty(),
      check("password", "Password is required").not().isEmpty(),
      check("password", "Password size must be 3-20 chars").isLength({
        min: 3,
        max: 20,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).send({
          message: "Validation error",
          error: errors.array(),
        });
      }
      res.json(await user.update(req, res));
    }
  );

  // Delete a User by id
  router.delete("/:id", async (req, res) => {
    res.json(await user.delete(req, res));
  });

  app.use("/api/user", router);
};
