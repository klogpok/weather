/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class UI {
  constructor() {
    this.elSelectCities = document.getElementById('w-changeCity');
    this.elLocation = document.getElementById('w-location');
    this.elDesc = document.getElementById('w-desc');
    this.elTemp = document.getElementById('w-temp');
    this.elIcon = document.getElementById('w-icon');
    this.elHumidity = document.getElementById('w-humidity');
    this.elPressure = document.getElementById('w-pressure');
    this.elWind = document.getElementById('w-wind');
    this.elSun = document.getElementById('w-sun');
  }

  renderSelectCities(cities) {
    let elStr = '';

    cities.forEach((city) => {
      elStr += `<option value="${city.id}"><strong>${city.name}</strong></option>`;
    });

    this.elSelectCities.innerHTML = elStr;
  }

  convertToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${`0${date.getMinutes()}`.substr(-2)}`;
  }

  renderCity(weather) {
    this.elLocation.textContent = `${weather.name} , ${weather.sys.country}`;
    this.elDesc.textContent = weather.weather[0].description;
    this.elTemp.innerHTML = `${Math.floor(weather.main.temp)} &deg;C`;
    this.elIcon.setAttribute(
      'src',
      `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
    );
    this.elHumidity.innerHTML = `<strong>Humidity</strong>: ${weather.main.humidity}%`;
    this.elPressure.innerHTML = `<strong>Pressure</strong>: ${weather.main.pressure} hPa`;
    this.elWind.innerHTML = `<strong>Wind</strong>: ${weather.wind.speed} m/s,  ${
      weather.wind.deg
    }&deg;`;
    this.elSun.innerHTML = `<strong>Sunrise</strong>: ${this.convertToTime(
      weather.sys.sunrise,
    )} <strong>Sunset</strong>: ${this.convertToTime(weather.sys.sunset)}`;

    this.elSelectCities.value = weather.id;
  }
}
