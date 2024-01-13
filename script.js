const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-button");
const API_key = "fa38c7ea4ecf776d195829e6d5850f1f";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_key}';

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        if (!data.length) return alert('No coordinates found for ${cityName}');
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("an erroe occurence while fetching the coordinates")
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_key}';

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (!data.length) return alert('No coordinates found for ${cityName}');
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("an erroe occurence while fetching the coordinates")
    });
}

searchButton.addEventListener("click", getCityCoordinates);