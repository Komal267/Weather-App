
console.log("my js is running")

const apiKey = "ed5efa0047a598aa06042c822fca4c96";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

// const searchBox = document.querySelector(".search-input");
// const searchBtn = document.querySelector(".search-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  if (response.ok) {
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    const weatherMain = data.weather[0].main.toLowerCase();

    // // Determine if it's day or night
    // const currentTime = new Date().getTime() / 1000;
    // const isDay = currentTime >= data.sys.sunrise && currentTime <= data.sys.sunset;

    // Get the icon code from the API response
    const iconCode = data.weather[0].icon; // e.g., "10d"
    document.querySelector(
      ".weather-icon"
    ).src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Display the weather description
    document.querySelector(".description").textContent =
      data.weather[0].description; // e.g., "light rain"
  } else {
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "--";
    document.querySelector(".humidity").innerHTML = "--";
    document.querySelector(".wind").innerHTML = "--";
   
  }
}
checkWeather("delhi");

// console.log(condition);
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-icon");

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });

  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkWeather(searchBox.value);
    }
  });
});