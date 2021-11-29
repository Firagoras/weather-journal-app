// Set up empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* --- Dependencies --- */
// Middleware
const bodyParser = require('body-parser');
const cors = require('cors');

// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Server Setup
const PORT = 3000;
const server = app.listen(PORT, listening);

// Function to produce a feedback to the Command Line consisting of the server status and the port number
function listening() {
  console.log(`Server is running on localhost ${PORT}`);
}

// Set up a GET route with two arguments: a route name and a callback function
app.get('/getData', getData);

// Function to send the endpoint data to the client side
function getData(req, res) {
  res.send(projectData);
}

// Set up a POST route with two arguments: a route name and a callback function
app.post('/postData', postData);

// Function to update the app endpoint in the server side using the data received from the client side.
function postData(req, res) {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  };
  res.send(projectData);
}