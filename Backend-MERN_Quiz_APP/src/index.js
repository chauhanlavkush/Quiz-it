require('dotenv').config();
 const express = require('express');
 const connect = require('./configs/db.js');
 const bodyParser = require('body-parser');
 const Port = process.env.PORT || 3755;
const cors = require('cors');
 const app = express();

 app.use(express.json());
app.use(cors({
 origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



 app.listen(Port, async function() {
   try {
     await connect();
     console.log(`Listening on ${Port}`);
   } catch (error) {
     console.error(error);
   }
 });