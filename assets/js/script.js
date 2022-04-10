// global variables to be used later.

var apiKey = '231fb17c47bf2c103858e53586fbe4c7';
var searchBox = document.querySelector('#searchSection');
var cityName = document.querySelector('#searchBox');
var searchbutton = document.querySelector('button');
var cityList = document.querySelector('#cityList');

// current weather data
var currentIcon = document.querySelector("#currentIcon");
// end current weather data

var dayOne = document.querySelector('#dayOne');
var dayTwo = document.querySelector('#dayTwo');
var dayThree = document.querySelector('#dayThree');
var dayFour = document.querySelector('#dayFour');
var DayFive = document.querySelector('#dayFive');
var cityObj = [];

// global variable end


// function for typing and submitting city name
var submitCity = function(event) {
    event.preventDefault();
    // get value of input element
    var city = cityName.value.trim();
    console.log(city);
    saveCity();

    if (city) {
        getCityInfo(city, apiKey);
        //console.log(apiKey)
        cityName.value = '';
    } else {
        alert('please enter a city name');
        console.log('please enter city name');
    }

};

// use api 5 day info to build page.
var getCityInfo = function (cities, key) {
    var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cities},US&appid=${key}&units=imperial`;


    // make a request to openWeather api
    fetch(apiUrl).then(function (response) {
        // if request was successfull
        if(response.ok) {
            response.json()
            .then(function(data) {
                console.log(data);
                displayWeather(data, cities);
                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`).then(function (response) {
                    if (response.ok) {
                        response.json().then( function(data) {
                            // log city name and data
                            console.log(cities);
                            console.log(data);

                            // city name to page
                            var dailyCity = document.querySelector('.cityName');
                            dailyCity.textContent = cities + ' ' +moment().format('(l)');

                            // add city date to page
                            //var todayDate = moment().format('(l)');
                            //currentDate.textContent = todayDate;

                            //get temp to page
                            var dailyTemp = document.querySelector('.temp');
                            var currentTemp = data.current.temp;
                            dailyTemp.textContent = `Temp: ${currentTemp} ℉`;

                            //get wind speed to page
                            var dailyWind = document.querySelector('.wind');
                            var currentWind = data.current.wind_speed;
                            dailyWind.textContent = `Wind: ${currentWind} MPH`;

                            //get humidity level to page
                            var dailyHumidity = document.querySelector('.humidity');
                            var currentHumidity = data.current.humidity;
                            dailyHumidity.textContent = `Humidity: ${currentHumidity} %`;

                            // get curent uv index to page
                            var dailyUv = document.querySelector('.uvIndex');
                            var uvIndex = data.current.uvi;
                            dailyUv.textContent = `UV Index: ${uvIndex}`
                            
                        })
                    }
                })
            });
        } else {
            alert('not a city try again!');
        }
    })
    .catch(function(error) {
        alert('unable to connect to openWeather api');
    })
};

var displayWeather = function(dataInfo, city) {
    console.log(city);
    console.log(dataInfo);
    
}

// save city to local storage
var saveCity = function() {
    cityObj.push(cityName.value)
    //console.log(cityObj.value); returns as undefined. dont use
    localStorage.setItem('city', JSON.stringify(cityObj));
    loadCity()
}

var loadCity = function () {
    var savedCity = localStorage.getItem('city');
    var cityList = document.querySelector('#cityList');
    console.log(savedCity);
    //console.log(savedCity); reutes as null dont use
    
    for (let i = 0; i < cityObj.length; i++) {
        var anchorItem = document.createElement('a');
        //anchorItem.setAttribute('href', 'cityObj[i]');
        //console.log(anchorItem)
        var listItem = document.createElement('li');
        listItem.className = "list"
        console.log(cityObj);
        listItem.textContent = cityObj[i];
        //listItem.appendChild(anchorItem);
        cityList.appendChild(listItem);

        cityObj = [];
    }
};


searchBox.addEventListener('submit', submitCity);

loadCity();