const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-button");
const locationButton = document.querySelector(".location-button");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardDiv = document.querySelector(".weather-cards");

const API_key = "485b09b08a7fe230b73c96870395c2e4";

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
            const dateOptions = { weekday: 'long', day:'numeric', month:'numeric', year:'numeric' };
            const formattedDate = new Date(weatherItem.dt_txt).toLocaleDateString('en-US', dateOptions);
    
        return `
         
        <div class="details">
             <h2>${cityName}</h2> <h2>  ${formattedDate} </h2>
        </div>
         <div class="icon">
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather">
            <h4>${weatherItem.weather[0].description} </h4>
        </div>
        <div class="details">  
            <h4 class="temp">${(weatherItem.main.temp - 273.15).toFixed(2)} °C</h4>
        </div>
        <div class="details">
            <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
            <h4>Humidity: ${weatherItem.main.humidity} %</h4>
        </div>
       `;

    }else{
        const dateOptions = { weekday: 'short', day:'numeric', month:'numeric', year:'numeric' };
            const formattedDate = new Date(weatherItem.dt_txt).toLocaleDateString('en-US', dateOptions);
    
        return `
            <li class="card">
            <h3>${formattedDate}</h3>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather">
            <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)} °C</h4>
            <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
            <h4>Humidity: ${weatherItem.main.humidity} %</h4>
            </li>`;
    }
}

const getWeatherDetails = (cityName, lat, lon) => {

    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_key}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate))
            return uniqueForecastDays.push(forecastDate);
        })

        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardDiv.innerHTML ="";

        console.log(fiveDaysForecast);
    
        fiveDaysForecast.forEach((weatherItem, index) => {
            if(index === 0){
            currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }else{
             weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
        });

    }).catch(() => {
        alert("an error occurred while fetching the weather forecast")
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_key}`;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {

        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("an erroe occurence while fetching the coordinates")
    });
}
const getUserCoordinates = () => {

    navigator.geolocation.getCurrentPosition(
        position=> {

          const {latitude, longitude } = position.coords;
          const REVERSE_GEOCODING_URL =`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_key}`;
         
          fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
                const { name} = data[0];
                getWeatherDetails(name, latitude, longitude);
        }).catch(() => {
            alert("an erroe occurence while fetching the city")
        });
       
        },
        error =>{
           if(error.code === error.PERMISSION_DENIED) {
            alert('Please enable location sharing in your browser');
           }
        }
    );
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);