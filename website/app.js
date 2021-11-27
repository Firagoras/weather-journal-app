/* --- Global Variables --- */
// Base URL for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=bca22b88e7dbaa3c3e19532a74f0380a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create an event listener for the Generate button with a callback function to execute once the button is clicked
document.getElementById('generate').addEventListener('click', getWeatherData);

// Function called by the event listener to set up the app logic: 1) get API data 2) post data to the server side 3) update the user UI
function getWeatherData () {
  const zip = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;
  // Get API data
  fetchApiData(baseURL+zip+apiKey)
  // Once the API data is successfuly returned, make a POST request to the server side
  .then(apiData => {
    postData('/postData', {'temperature': apiData.main.temp, 'date': newDate, 'userResponse': userResponse});
  })
  // Once data is successfuly stored in the server side, execute updateUI function
  .then(updateUI); 
}

// Asyncronous function to get API data
const fetchApiData = async (url) => {
  const response = await fetch(url);

  try {
    const apiData = await response.json();
    return apiData;
  } catch (error) {
    console.log('error', error)
  }
};

// Asyncronous function to POST data to the server side
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

// Asynchronous function to get endpoint data from the serve side and aupdate the user UI accordignly 
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