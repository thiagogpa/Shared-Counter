module.exports = (app) => {
  const login = require("../controllers/authenticate.controller");

  var router = require("express").Router();

  // Authenticate using username
  router.post("/authenticate", async (req, res) => {
    await login.authenticate(req, res);
  });

  // Authenticate using username
  router.post("/logoff", login.logoff);

  app.use("/api/", router);
};
