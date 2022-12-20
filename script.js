const searchBtn = document.querySelector(".search");
const temp = document.querySelector(".temp");
const place = document.querySelector(".location");
const tempMin = document.querySelector(".temp-min").lastElementChild;
const tempMax = document.querySelector(".temp-max").lastElementChild;
const days = document.querySelectorAll(".day");
const currentDay = document.querySelector(".currentDay");
const tempUnitDisplay = document.querySelector(".tempUnitDisplay");
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const locationInput = document.querySelector(".input");
let tempUnit = "imperial";

searchBtn.onclick = getData;
tempUnitDisplay.onclick = changeTemp;

async function getData() {
  try {
    locationInput.style.borderBottom = " 2px solid white";
    const input = locationInput.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${tempUnit}&APPID=a93dc5d8b847e21f3fdb25aa086743d9`,
      { mode: "cors" }
    );
    const data = await response.json();
    temp.textContent = `${data.main.temp}`;
    tempMax.textContent = `${data.main.temp_max}`;
    tempMin.textContent = `${data.main.temp_min}`;
    getState(data);
    getForecast(input);
  } catch {
    locationInput.style.borderBottom = " 2px solid red";
    place.firstChild.textContent = "Invalid location";
  }
}

async function getState(data) {
  const lat = data.coord.lat;
  const long = data.coord.lon;
  const fetchData = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=a93dc5d8b847e21f3fdb25aa086743d9`,
    { mode: "cors" }
  );
  const geoData = await fetchData.json();

  //displays city, state, & country if possible
  if (geoData[0].state !== "") {
    return (place.firstChild.textContent = `${data.name}, ${geoData[0].state}, ${data.sys.country}`);
  } else
    return (place.firstChild.textContent = `${data.name}, ${data.sys.country}`);
}

//gets 3 day forecast
async function getForecast(input) {
  const fetchData = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=${tempUnit}&APPID=a93dc5d8b847e21f3fdb25aa086743d9`,
    { mode: "cors" }
  );
  const response = await fetchData.json();
  let num = 8;

  currentDay.textContent = weekday[new Date(response.list[0].dt_txt).getDay()];

  for (let i = 0; i < days.length; i++) {
    let currentTime = await response.list[num].dt_txt;
    let current = weekday[new Date(currentTime).getDay()];
    days[i].firstChild.textContent = current;
    days[i].firstElementChild.textContent = response.list[num].main.temp;
    num += 8;
  }
  num = 8;
}

function changeTemp() {
  let unit = "";
  if (tempUnit === "imperial") {
    tempUnit = "metric";
    unit = "°C";
  } else {
    tempUnit = "imperial";
    unit = "°F";
  }
  tempUnitDisplay.textContent = unit;
  getData();
}

// const testResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${data.sys.country}&appid=a93dc5d8b847e21f3fdb25aa086743d9&units=${tempUnit}`, {mode:'cors'});
