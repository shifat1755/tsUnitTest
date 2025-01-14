const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/nodeTs';

export const dbConnection = async () => {
  if (process.env.CI === 'true') {
    console.log('Skipping MongoDB connection in CI environment');
    return;
  }
    try {
      await mongoose.connect(dbURI);
      console.log("dbConnected");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  };
  