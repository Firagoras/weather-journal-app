/**
* Start Global Variables
* 
*/

// Base URL for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=bca22b88e7dbaa3c3e19532a74f0380a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Key elements selectors
const zipInput = document.getElementById('zip');
const generateBtn = document.getElementById('generate')

/**
* End Global Variables
* 
* Start Helper Functions
*/

// Helper boolean function to check whether an input meets its validation constraints, if not it sets a custom validity message, show a red border and return false
function inputValidation(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity(`Please fill out this field: ${input.title}`);
    showRedBorder(input);
    return false;
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(`Please match the requested format: ${input.title}`);
    showRedBorder(input);
    return false;
  } else {
    input.setCustomValidity('');
    hideRedBorder(input);
    return true;
  }
}

// Helper function to handle input event 
function inputListener() {
  inputValidation(zipInput);
}

// Helper function to set alert mode with 2-step validation (add a validation step on input change). A red border and a custom message are also shown to guide users
function setAlertMode(input) {
  showRedBorder(input);
  input.reportValidity();
  input.addEventListener('input', inputListener);
}

// Helper function to quit the alert mode and reset default mode with 1-step validation occurs only on a button click and no red border
function resetMode(input) {
  hideRedBorder(input);
  input.removeEventListener('input', inputListener);
}

// Helper function to handle the click event on the Generate button. It mainly validates input, set relevant mode accordingly and then process the request when input is valid
function processRequest() {
  // Check if Zip code input is valid
  if (inputValidation(zipInput)) {
    resetMode(zipInput);
    getWeatherData();
  } else {
    setAlertMode(zipInput);
  }
}

// Helper function to show a red border around an element with invalid input
function showRedBorder(element) {
  element.classList.add('invalid');
}

// Helper function to hide a red border around an element with valid input
function hideRedBorder(element) {
  element.classList.remove('invalid');
}

/**
* End Helper Functions
* 
* Begin Main Functions
*/

// Function to set up the main app logic: 1) get API data 2) post data to the server side 3) update the UI
function getWeatherData() {
  const zipCode = zipInput.value;
  const userResponse = document.getElementById('feelings').value;

  // Get API data
  fetchApiData(baseURL+zipCode+apiKey)
  // Once the API data is successfully returned, make a POST request to the server side
  .then(apiData => {
    postData('/postData', {'temperature': apiData.main.temp, 'date': newDate, 'userResponse': userResponse});
  })
  // Once data is successfully stored in the server side, execute updateUI function
  .then(updateUI);
}

// Asynchronous function to get API data
const fetchApiData = async (url) => {
  const response = await fetch(url);

  try {
    const apiData = await response.json();
    return apiData;
  } catch (error) {
    console.log('error', error)
  }
};

// Asynchronous function to POST data to the server side
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const serverData = await response.json();
    return serverData;
  } catch (error) {
    console.log('error', error);
  }
}

// Asynchronous function to get endpoint data from the server side and update the user UI accordingly
const updateUI = async() => {
  const response = await fetch('/getData');

  try {
    const serverData = await response.json();
    document.getElementById('date').innerHTML = `Date: ${serverData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${serverData.temperature} Fahrenheit`;
    document.getElementById('content').innerHTML = `User Feeling: ${serverData.userResponse}`;
  } catch (error) {
    console.log('error', error);
  }
}

/**
* End Main Functions
* 
* Begin Main Events
*/

// Create an event listener for the Generate button with a callback function to execute once the button is clicked
generateBtn.addEventListener('click', processRequest);
