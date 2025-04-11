
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = '04e8a5e755a0e2a2b07a047058c2d610';

getWeatherBtn.addEventListener('click', function () {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            console.log('Status:', response.status);
            if (response.status === 401) {
                weatherInfo.innerHTML = `<p class="error">Unauthorized: Please check your API key.</p>`;
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherInfo.innerHTML = `<p class="error">Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            weatherInfo.innerHTML = `<p class="error">Error fetching the data!</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Weather: ${weather[0].description}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;
}
