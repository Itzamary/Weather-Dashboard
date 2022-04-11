// global variables to be used later.
var apiKey = '231fb17c47bf2c103858e53586fbe4c7';
var searchBox = document.querySelector('#searchSection');
var cityName = document.querySelector('#searchBox');
var cityObj = [];
var cityButton = document.querySelector('#citys');

// function for typing and submitting city name
var submitCity = function(event) {
    event.preventDefault();
    // get value of input element
    var city = cityName.value.trim();
    saveCity();

    if (city) {
        getCityInfo(city, apiKey);
        cityName.value = '';
    } else {
        alert('please enter a city name');
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
                displayWeather(data, cities);
                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`).then(function (response) {
                    if (response.ok) {
                        response.json().then( function(data) {

                            // city name to page
                            var dailyCity = document.querySelector('.cityName');
                            dailyCity.textContent = cities + ' ' +moment().format('(l)');

                            // add icon to page
                            var currentIcon = document.querySelector("#currentIcon");
                            var icon = data.current.weather[0].icon;
                            var iconLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                            currentIcon.setAttribute('src', iconLink);
                            
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
                            var uvCondition = document.querySelector('#uvIndex');
                            var uvIndex = data.current.uvi;
                            uvCondition.textContent = uvIndex;
                            dailyUv.textContent = 'UV Index: ';

                            if (uvIndex >= 0.0 && uvIndex <= 2.99) {
                                uvCondition.setAttribute('class','uvFavorable');
                            } else if( uvIndex >= 3 && uvIndex <=5.99) {
                                uvCondition.setAttribute('class','uvModerate');
                            } else if (uvIndex >= 6 && uvIndex <=10.99) {
                                uvCondition.setAttribute('class','uvSevere');
                            }
                            
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

var displayWeather = function(dataInfo) {

    // day 1 after current day
    var day1Date = document.querySelector('#d1Date');
    day1Date.textContent = moment().add(1, 'days').format('l');
    //icon
    var day1Icon = document.querySelector('#d1icon');
    var iconD1 = dataInfo.list[0].weather[0].icon;
    //console.log(iconD1);
    var iconLinkD1 = `http://openweathermap.org/img/wn/${iconD1}@2x.png`;
    //console.log(iconLinkD1);
    day1Icon.setAttribute('src', iconLinkD1);
    // temp
    var day1Temp = document.querySelector('#d1Temp');
    day1Temp.textContent = `Temp: ${dataInfo.list[0].main.temp} ℉`;
    // wind
    var day1Wind = document.querySelector('#d1Wind');
    day1Wind.textContent = `Wind: ${dataInfo.list[0].wind.speed} MPH`;
    // humidity
    var day1Humidity = document.querySelector('#d1Humidity');
    day1Humidity.textContent = `Humidity: ${dataInfo.list[0].main.humidity} %`;

    // day 2 after current day
    var day2Date = document.querySelector('#d2Date');
    day2Date.textContent = moment().add(2, 'days').format('l');

    // icon
    var day2Icon = document.querySelector('#d2icon');
    var iconD2 = dataInfo.list[8].weather[0].icon;
    var iconLinkD2 = `http://openweathermap.org/img/wn/${iconD2}@2x.png`;
    day2Icon.setAttribute('src', iconLinkD2);
    // temp
    var day2Temp = document.querySelector('#d2Temp');
    day2Temp.textContent = `Temp: ${dataInfo.list[8].main.temp} ℉`;
    // wind
    var day2Wind = document.querySelector('#d2Wind');
    day2Wind.textContent = `Wind: ${dataInfo.list[8].wind.speed} MPH`;
    // humidity
    var day2Humidity = document.querySelector('#d2Humidity');
    day2Humidity.textContent = `Humidity: ${dataInfo.list[8].main.humidity} %`;

    // day 3 after current day
    var day3Date = document.querySelector('#d3Date');
    day3Date.textContent = moment().add(3, 'days').format('l');
    // icon
    var day3Icon = document.querySelector('#d3icon');
    var iconD3 = dataInfo.list[16].weather[0].icon;
    var iconLinkD3 = `http://openweathermap.org/img/wn/${iconD3}@2x.png`;
    day3Icon.setAttribute('src', iconLinkD3);
    // temp
    var day3Temp = document.querySelector('#d3Temp');
    day3Temp.textContent = `Temp: ${dataInfo.list[16].main.temp} ℉`;
    // wind
    var day3Wind = document.querySelector('#d3Wind');
    day3Wind.textContent = `Wind: ${dataInfo.list[16].wind.speed} MPH`;
    // humidity
    var day3Humidity = document.querySelector('#d3Humidity');
    day3Humidity.textContent = `Humidity: ${dataInfo.list[16].main.humidity} %`;

    // day 4 after current day
    var day4Date = document.querySelector('#d4Date');
    day4Date.textContent = moment().add(4, 'days').format('l');
    // icon
    var day4Icon = document.querySelector('#d4icon');
    var iconD4 = dataInfo.list[24].weather[0].icon;
    var iconLinkD4 = `http://openweathermap.org/img/wn/${iconD4}@2x.png`;
    day4Icon.setAttribute('src', iconLinkD4);
    // temp
    var day4Temp = document.querySelector('#d4Temp');
    day4Temp.textContent = `Temp: ${dataInfo.list[24].main.temp} ℉`;
    // wind
    var day4Wind = document.querySelector('#d4Wind');
    day4Wind.textContent = `Wind: ${dataInfo.list[24].wind.speed} MPH`;
    // humidity
    var day4Humidity = document.querySelector('#d4Humidity');
    day4Humidity.textContent = `Humidity: ${dataInfo.list[24].main.humidity} %`;

    // day 5 after current day
    var day5Date = document.querySelector('#d5Date');
    day5Date.textContent = moment().add(5, 'days').format('l');
    // icon
    var day5Icon = document.querySelector('#d5icon');
    var iconD5 = dataInfo.list[32].weather[0].icon;
    var iconLinkD5 = `http://openweathermap.org/img/wn/${iconD5}@2x.png`
    day5Icon.setAttribute('src', iconLinkD5);
    //temp
    var day5Temp = document.querySelector('#d5Temp');
    day5Temp.textContent = `Temp: ${dataInfo.list[32].main.temp} ℉`;
    // wind
    var day5Wind = document.querySelector('#d5Wind');
    day5Wind.textContent = `Wind: ${dataInfo.list[32].wind.speed} MPH`;
    // humididty
    var day5Humidity = document.querySelector('#d5Humidity');
    day5Humidity.textContent = `Humidity: ${dataInfo.list[24].main.humidity} %`;
}

// save city to local storage
var saveCity = function() {
    cityObj.push(cityName.value)
    localStorage.setItem('city', JSON.stringify(cityObj));
    loadCity()
}

// load city
var loadCity = function () {
    var cityList = document.querySelector('#citys');
    
    for (let i = 0; i < cityObj.length; i++) {
        var listButton = document.createElement('button');
        listButton.className = "list";
        listButton.textContent = cityObj[i];
        cityList.appendChild(listButton);
        cityObj = [];
    }
};

// button click for saved cities
function searchCity(event) {
    console.log('anyting');
    console.log(event);
    console.log(event.target.innerText);
    var city = event.target.innerText;
    getCityInfo(event.target.innerText, apiKey);
};

cityButton.addEventListener('click', searchCity);

searchBox.addEventListener('submit', submitCity);

loadCity();