const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-button");
const API_key = "485b09b08a7fe230b73c96870395c2e4";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_key}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getdays();
            if(!uniqueForecastDays.includes(forecastDate))
            return uniqueForecastDays.push(forecastDate);
        })

        console.log('fiveDaysForecast');

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

searchButton.addEventListener("click", getCityCoordinates);