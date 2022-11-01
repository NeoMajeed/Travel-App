// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8080;

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{
    console.log("server working on port: " + port);
})

// Get route
app.get("/all", (req,res)=>{
    res.send(projectData);
})


// Post route
app.post("/add", (req,res)=>{
    projectData.city = req.body.city;
    projectData.country = req.body.country;
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    res.send(projectData);
})


