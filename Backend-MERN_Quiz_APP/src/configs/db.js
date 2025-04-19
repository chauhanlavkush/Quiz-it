
const mongoose = require('mongoose')
require('dotenv').config()
 module.exports = () => {
 const uri = process.env.MONGO_URI || process.env.DATABASE;
return mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
 }