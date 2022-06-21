//import middlewares
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require("mysql");
require("dotenv").config();


//include middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//create connection to mysql database
const db = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});



//listen backend requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on  port ${PORT}.`);
});