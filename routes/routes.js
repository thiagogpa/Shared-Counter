//Requires all the routes

module.exports = (app) => {
  require("./authenticate.routes")(app);  
  require("./counter.routes")(app);  
  require("./user.routes")(app);  
};
