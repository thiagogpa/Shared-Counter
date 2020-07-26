const mongoose = require('mongoose');
const { logger } = require("./logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });    
    logger.info('Database connected')
  } catch (err) {
    logger.info('Unable to connect to database')
    process.exit();
  }
};

module.exports = connectDB;
