const API_KEY = '9470f162a34d93086760b16d1426a9ed';
const mainScreen = document.querySelector('.main-screen');
const forecastScreen = document.querySelector('.forecast-screen');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weather-condition');
const dateTime = document.getElementById('date-time');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const airQuality = document.getElementById('air-quality');
const humidity = document.getElementById('humidity');
const precipitation = document.getElementById('precipitation');
const forecastButton = document.getElementById('forecast-button');
const backButton = document.getElementById('back-button');
const weeklyForecast = document.getElementById('weekly-forecast');
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const background = document.querySelector('.background');

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  getWeatherByCoords(latitude, longitude);
  getForecastByCoords(latitude, longitude);
});

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    getWeatherByCity(city);
    getForecastByCity(city);
  }
});

function getWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => updateWeatherUI(data));
}

function getForecastByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => updateForecastUI(data));
}

function getWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => updateWeatherUI(data));
}

function getForecastByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => updateForecastUI(data));
}

function updateWeatherUI(data) {
  cityName.textContent = data.name;
  weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
  temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
  weatherCondition.textContent = `Description: ${data.weather[0].description}`;
  dateTime.textContent = `Date and Time: ${new Date().toLocaleString()}`;
  sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
  sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
  airQuality.textContent = 'Air Quality: Moderate'; // Placeholder
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  precipitation.textContent = `Precipitation: ${data.clouds.all}%`;

  changeBackground(data.weather[0].main);
}

function updateForecastUI(data) {
  const forecasts = data.list.slice(0, 7).map(forecast => `
    <div>
      <span>${new Date(forecast.dt * 1000).toLocaleDateString()}</span>
      <span>${getWeatherIcon(forecast.weather[0].icon)}</span>
      <span>Temperature: ${Math.round(forecast.main.temp)}°C</span>
      <span>Description: ${forecast.weather[0].description}</span>
    </div>
  `);
  weeklyForecast.innerHTML = forecasts.join('');
}

function getWeatherIcon(iconCode) {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return `<img src="${iconUrl}" alt="Weather icon">`;
}

function changeBackground(weather) {
  let color;
  switch (weather.toLowerCase()) {
    case 'clear':
      color = '#87CEEB'; 
      break;
    case 'clouds':
      color = '#B0C4DE'; 
      break;
    case 'rain':
      color = '#4682B4';e
      break;
    case 'snow':
      color = '#FFFFFF'; 
      break;
    case 'thunderstorm':
      color = '#778899'; 
      break;
    default:
      color = '#F0E68C'; 
      break;
  }
  background.style.backgroundColor = color;
}

forecastButton.addEventListener('click', () => {
  mainScreen.style.display = 'none';
  forecastScreen.style.display = 'block';
});

backButton.addEventListener('click', () => {
  forecastScreen.style.display = 'none';
  mainScreen.style.display = 'block';
});
