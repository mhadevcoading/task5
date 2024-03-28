const weatherContainer = document.getElementById('weather-container');
const locationInput = document.getElementById('location-input');
const getWeatherBtn = document.getElementById('get-weather-btn');

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

function getWeather(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayWeather(data);
    })
    .catch(error => {
      console.error(error);
      weatherContainer.textContent = "Error: Couldn't fetch weather data";
    });
}

function displayWeather(data) {
  weatherContainer.innerHTML = ''; // Clear previous content

  const city = data.name;
  const temperature = Math.floor(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherContainer.innerHTML = `
    <h2>Weather in ${city}</h2>
    <img src="${iconUrl}" alt="${description}">
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
  `;
}

getWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value;
  if (!location) {
    alert('Please enter a location.');
    return;
  }
  getWeather(location);
});

// Optional: Get user location (requires permission)
navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeather(`${lat},${lon}`); // Use comma-separated lat/lon for API call
}, () => {
  console.log('Geolocation permission denied');
});
