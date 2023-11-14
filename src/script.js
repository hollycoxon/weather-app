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
  let currentCityTemp = Math.round(response.data.temperature.current);
  let currentTempLabel = document.querySelector("#currentTemp");
  currentTempLabel.innerHTML = `${currentCityTemp}°`;
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
}
//Update city searched
function searchCityUpdate(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#userCityInput");

  let city = document.querySelector("h1.city");
  city.innerHTML = `${
    searchValue.value.trim().substring(0, 1).toUpperCase() +
    searchValue.value.trim().substring(1)
  }`;
  let apiKey = "eb90b6ft43fead476caf1eb7234o9610";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchValue.value}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
let searchButton = document.querySelector("#citySearch");
searchButton.addEventListener("submit", searchCityUpdate);

//Set dateTime to now
function currentDateTime() {
  let now = new Date();
  let wordDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = document.querySelector("#day");
  currentDay.innerHTML = `${wordDay[now.getDay()]}`;
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}
currentDateTime();
