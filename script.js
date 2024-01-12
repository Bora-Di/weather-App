const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-button");
const API_key = "485b09b08a7fe230b73c96870395c2e4";

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_key}';

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(() => {

    })
}

searchButton.addEventListener("click", getCityCoordinates);