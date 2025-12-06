let value = document.getElementById("value");
let locatione = document.getElementById("location");
let flag = document.getElementById("flag");
let weatherImage = document.getElementById("weatherImage");
let cloud = document.getElementById("cloud");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let temperature = document.getElementById("temperature");
let tempValue = document.getElementById("temperatureValue");
let desc = document.getElementById("desc");
let form = document.querySelector("form");
let main = document.querySelector("main");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (value.value.trim() !== "") {
    searchWeather();
  }
});

const id = "420b0145eb6bc82d03a750ced713fb61";
const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + id + "&units=metric";

const searchWeather = () => {
  const fullUrl = url + "&q=" + value.value.trim();

  fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data);

      if (data.cod === 200) {
        locatione.innerText = data.name + ", " + data.sys.country;

        flag.src = "https://flagsapi.com/" + data.sys.country + "/shiny/64.png";

        weatherImage.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";

        tempValue.innerText = data.main.temp + " °C";
        humidity.innerText = data.main.humidity + " %";
        pressure.innerText = data.main.pressure + " hPa";
        cloud.innerText = data.clouds.all + " %";
        desc.innerText = data.weather[0].description;

        main.classList.remove("error");
      } else {
        console.log("Error:", data.message);
        main.classList.add("error");
        setTimeout(() => {
          main.classList.remove("error");
        }, 300);
      }

      value.value = "";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      main.classList.add("error");
      setTimeout(() => {
        main.classList.remove("error");
      }, 300);
    });
};