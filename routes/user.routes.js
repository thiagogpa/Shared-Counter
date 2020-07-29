module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const { check, validationResult } = require("express-validator");
  var router = require("express").Router();

  // Create a new User
  router.post(
    "/",
    [
      check("username", "username is required").not().isEmpty(),
      check("password", "Password is required").not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).send({
          message: "Validation error",
          error: errors.array(),
        });
      }
      await user.create(req, res);
    }
  );

  // Retrieve all Users
  router.get("/", async (req, res) => {
    await user.findAll(req, res);
  });

  // Retrieve a single User by ID
  router.get("/:id", async (req, res) => {
    await user.findOne(req, res);
  });


  // Retrieve a single User by ID
  router.put("/addToGroup/:id", async (req, res) => {
    await user.addToGroup(req, res);
  });


  // Update a User by id
  router.put(
    "/:id",
    [
      check("username", "username is required").not().isEmpty(),
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
      await user.update(req, res);
    }
  );

  // Delete a User by id
  router.delete("/:id", async (req, res) => {
    await user.delete(req, res);
  });

  app.use("/api/user", router);
};
