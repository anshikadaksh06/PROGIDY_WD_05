const apiKey = "OpenWeatherApp"; // Replace with OpenWeatherMap API Key

// Fetch weather by city name
function fetchWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    } else {
        alert("Please enter a city name.");
    }
}

// Fetch weather by current location
function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        }, () => alert("Unable to retrieve location."));
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch data from API
function fetchWeather(apiURL) {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(error => {
            alert("Error fetching weather data.");
            console.error(error);
        });
}

// Update UI with weather data
function updateWeatherUI(data) {
    document.getElementById("cityName").textContent = data.name || "Unknown City";
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("weatherDescription").textContent = capitalizeFirstLetter(data.weather[0].description);
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
