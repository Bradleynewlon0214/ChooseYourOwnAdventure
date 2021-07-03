/*
* Author: Bradley Newlon
* This file connects to the database, sets up middleware, pulls in our routes for use, and runs the server 
*/

const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();


dotenv.config();

//Connect to Database
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("DB Connection Established")
);

//middleware for rest api
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Import Routes
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/storyRoutes');

//Route middlewares
app.use(authRoutes);
app.use('/story', storyRoutes);

app.listen(3001, () => console.log("Server Running at: http://localhost:3001"));