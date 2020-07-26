//Requires all the routes

module.exports = (app) => {
  require("./user.routes")(app);  
};
