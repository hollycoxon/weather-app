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

//update current temperature
function updateCurrentTemp(response) {
  let currentCityTemp = Math.round(response.data.temperature.current);
  let currentTempLabel = document.querySelector("#currentTemp");
  currentTempLabel.innerHTML = `${currentCityTemp}°`;
  let epochDate = response.data.time * 1000;
  let date = new Date(epochDate);
  formatDate(date);
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
  axios.get(apiUrl).then(updateCurrentTemp);
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
