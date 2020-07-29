//Requires all the routes

module.exports = (app) => {
  require("./counter.routes")(app);  
  require("./authenticate.routes")(app);    
  require("./user.routes")(app);  
};
