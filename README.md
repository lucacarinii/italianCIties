# Welcome to Italian Cities Project

- About The Project
  - Built With
- Getting Started
  - Prerequisites
  - Installation
- Usage
- Contributing

## About The Project

Link deployed site: https://jolly-goldwasser-56d81a.netlify.app <br />
Link API deployed to retrieve the cities: https://cherry-project.herokuapp.com/cities/listOfAllCities <br />
(In the Usage section it is explained how to use it)

![Index Page](https://github.com/lucacarinii/ItalianCities/blob/main/CherryProject/images/Index.png "Index")

This application retrieves the updated list of the active cities and suppressed ones of Italy.
It has a scheduled job (every day at midnight) that downloads the files containing these infos, clear the MongoDB collection and writes all the records read from the files.

### Built With

- NodeJS
- ReactJS
- Bootstrap

To “beautify” the code, it has been used ESLint and Prettier

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
```bash
npm install npm@latest -g
```
- node
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
```bash
brew update
```
```bash
brew install node
```
(or go to the link https://nodejs.org/en/download/current/)

### Installation

- Go to the directory where you want to create the files
```bash
cd <path>
```
- Clone the repo
```bash
git clone https://github.com/lucacarinii/ItalianCities.git
```
- Install NPM packages
```bash
npm install
```
- Go to the /server folder and rename the file .env.example to .env
- Open the .env file and change the value of the PORT variable to the preferred one, also change the URL_DBCONNECTION to your MongoDB connection string and remove the double quotes
- Open the globalVars.js file inside the /client/src/globalVariables folder and comment the first line and uncomment the second one, if you want to connect the client to the local server, or comment the last line and uncomment the first one, to call the API deployed on heroku
- To start the local server, go to the /server folder and start IT
```bash
cd server
```
```bash
npm start
```
- To start the client, go to the client folder and start it
```bash
cd client
```
```bash
npm start
```

## Usage

If you want to the the deployed API, make a call to https://cherry-project.herokuapp.com/cities/listOfAllCities. This will return all the italian cities (active and suppressed). In order to filter the result, use the query parameters:
- name (get the city with this name)
- province (get only the cities that belong to that province)
- cityCode (get the city with this cityCode)
- isSuppressed (True/False, to get the active cities or the suppressed ones)
- suppressionDate (yyyy-MM-dd, to get the list of the cities suppressed in that day)

e.g. https://cherry-project.herokuapp.com/cities/listOfAllCities?name=Milano

To see the UI, goIf you want to see the UI deployed to netlify, go to https://jolly-goldwasser-56d81a.netlify.app , here follows some snapshots taken from the web app.

This is the main page.
At the top, there is a form where you can query the data, filtering by City Name, Province, CIty Code and so on.

![Filtering](https://github.com/lucacarinii/ItalianCities/blob/main/CherryProject/images/Filtering.png "Filter")

At the bottom of the page, you can see a dropdown list. It indicates which page are you seeing and also you can easily change to another one by clicking the number that you want

![Pages](https://github.com/lucacarinii/ItalianCities/blob/main/CherryProject/images/Pages.png "Pages")

## Contributing

- Fork the Project
- Create your Feature Branch 
```bash
git checkout -b feature/newFeature
```
- Commit your Changes
```bash
git commit -m 'New Feature'
```
- Push to the Branch 
```bash
git push origin feature/newFeature
```
- Open a Pull Request
