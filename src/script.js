//Build date in correct format
function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes().toString().padStart(2, "0");
  let time = `${hour}:${minute}`;
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = `${day}`;
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `${time}`;
}

//update current weather details
function updateWeather(response) {
  let city = document.querySelector("h1.city");
  city.innerHTML = `${
    response.data.city.trim().substring(0, 1).toUpperCase() +
    response.data.city.trim().substring(1)
  }`;
  let currentCityTemp = Math.round(response.data.temperature.current);
  let currentTempLabel = document.querySelector("#currentTemp");
  currentTempLabel.innerHTML = `${currentCityTemp}°C`;
  let epochDate = response.data.time * 1000;
  let date = new Date(epochDate);
  formatDate(date);
  let humidity = Math.round(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed * 10) / 10;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;
  let description = response.data.condition.description;
  description =
    description.trim().substring(0, 1).toUpperCase() +
    description.trim().substring(1);
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;
  let icon = response.data.condition.icon_url;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `
    <img
      src="${icon}"
      alt="${description}"
    />
  `;
  getForecast(response.data.city);
}
//Update city searched
function searchCityUpdate(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#userCityInput");
  FetchCurrentWeather(searchValue.value);
}
function FetchCurrentWeather(city) {
  let apiKey = "eb90b6ft43fead476caf1eb7234o9610";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
let searchButton = document.querySelector("#citySearch");
searchButton.addEventListener("submit", searchCityUpdate);
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", fetchCurrentLocation);

// fetch forecast
function formatForecastDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day.getDay()];
}

function getForecast(city) {
  let apiKey = "eb90b6ft43fead476caf1eb7234o9610";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response);
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col card card-1day shadow">
                    <div class="card-body forecast-day">${formatForecastDay(
                      day.time
                    )}</div>
                    <img
                src="${day.condition.icon_url}"
                alt=""
              />
                    <div class="card-body temp-range">
                      H:${Math.round(
                        day.temperature.maximum
                      )} <span class="low-temp">L:${Math.round(
        day.temperature.minimum
      )}</span>
                    </div>
                  </div>`;
  });
  forecast.innerHTML = forecastHtml;
}
//current Location button
function fetchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  console.log(position.coords.latitude);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "eb90b6ft43fead476caf1eb7234o9610";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

//call default city
FetchCurrentWeather("London");
