import OrderedDays from './utilities/timeManagement.js';

const apiKey = '069d4dd7d25690f64ea6beb3293ab365';
let apiResults;

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const location = document.querySelector('.location');
const hour = document.querySelectorAll('.hour-forecast-name');
const tempPerHour = document.querySelectorAll('.hour-forecast-value');
const day = document.querySelectorAll('.day-forecast-name');
const tempPerDays = document.querySelectorAll('.day-forecast-value');
const imgIcon = document.querySelector('.weather-logo');
const loadingContainer = document.querySelector('.overlay-loading-icon');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      callAPI(long, lat);
    },
    () => {
      alert(
        `L'application ne peut pas fonctionner car vous avez désactivé le service de géolocalisation. Pour que l'application fonctionne, vous devez l'activer.`
      );
    }
  );
}

function callAPI(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      apiResults = data;

      weather.innerText = apiResults.current.weather[0].description;
      temperature.innerText = `${Math.trunc(apiResults.current.temp)}°C`;
      location.innerText = apiResults.timezone;

      let currentHour = new Date().getHours();

      for (let i = 0; i < hour.length; i++) {
        let hourIncr = currentHour + i * 3;

        if (hourIncr > 24) {
          hour[i].innerText = `${hourIncr - 24} h`;
        } else if (hourIncr === 24) {
          hour[i].innerText = '00 h';
        } else {
          hour[i].innerText = `${hourIncr} h`;
        }
      }

      for (let j = 0; j < tempPerHour.length; j++) {
        tempPerHour[j].innerText = `${Math.trunc(
          apiResults.hourly[j * 3].temp
        )}°C`;
      }

      for (let k = 0; k < OrderedDays.length; k++) {
        day[k].innerText = OrderedDays[k].slice(0, 3);
      }

      for (let m = 0; m < 7; m++) {
        tempPerDays[m].innerText = `${Math.trunc(
          apiResults.daily[m + 1].temp.day
        )}°C`;
      }

      if (currentHour >= 6 && currentHour < 21) {
        imgIcon.src = `./src/day/${apiResults.current.weather[0].icon}.svg`;
      } else {
        imgIcon.src = `./src/night/${apiResults.current.weather[0].icon}.svg`;
      }

      loadingContainer.classList.add('disappearance');
    });
}
