module.exports = (app) => {
  const counter = require("../controllers/counter.controller");
  const { check, validationResult } = require("express-validator");
  var router = require("express").Router();

  // Create a new User
  router.post(
    "/addCounter",
    [
      check("code", "A counter code is required").not().isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).send({
          message: "Validation error",
          error: errors.array(),
        });
      }
      await counter.create(req, res);
    }
  );

  // Retrieve a single User by ID
  router.get("/:code", async (req, res) => {
    await counter.findOne(req, res);
  });

  app.use("/api/counter", router);
};
