# Weather-Journal App Project

## Overview

This project is an asynchronous web app that uses Web API (Open Weather API) and user input to dynamically update the UI.

## Development

The project is created using NodeJS which is an asynchronous event-driven JavaScript runtime, and ExpressJS which is a minimal Nodejs web application framework. Vanilla JavaScript is used in the app front end.

## Purpose

The app is the third project of Udacity's Front-End Web Developer Nanodegree. The project was created to meet specific requirements set by Udacity. Some improvements and new features may come soon.

## Instructions

Please note that the app accepts only numeric Zip codes. If you search for a Zip code outside the USA, the country code should be added at the end of the Zip code separated by a comma. Please, refer to [ISO 3166](https://www.iso.org/obp/ui/#search) for the state codes or country codes. If a country is not specified then the search works for the USA by default.

### Example:

94040 will fetch weather data for Mountain View in the USA
67000,fr will fetch weather data for the city of Strasbourg in France
E16AN,gb won't be accepted. Currently, this will trigger an error
