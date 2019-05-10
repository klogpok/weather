"use strict";

const MILLISECONDS_IN_HOUR = 60000;

class Weather {
  constructor(cities) {
    this.apiKey = '001bc132f62c2070651b5ae15d8df01b';
    this.cities = cities;
  }

  // Fetch weather
  async getWeather() {
    let localStorageCities = JSON.parse(localStorage.getItem("cities"));
    let localStorageTime = JSON.parse(localStorage.getItem("date"));
    let currentTime = new Date().getTime();

    if (localStorageCities && this.checkIfTimeExpired(currentTime, localStorageTime) ) {
      return localStorageCities;
    } else {
      const citiesString = this.createApiSting();
      const response = await fetch(
          `http://api.openweathermap.org/data/2.5/group?id=${citiesString}&units=metric&appid=${
              this.apiKey
              }`,
      );

      const responseData = await response.json();
      this.updateLocalStorage(responseData);
      return responseData.list;
    }
  }

  createApiSting() {
    return this.cities.length === 1 ? this.cities[0] : this.cities.join();
  }

  checkIfTimeExpired(currentTime, localStorageTime) {
    return (currentTime - localStorageTime) / MILLISECONDS_IN_HOUR < 1; // True if less then 1 hour
  }

  updateLocalStorage(data) {
    localStorage.setItem("cities", JSON.stringify(data.list));
    localStorage.setItem("date", JSON.stringify(new Date().getTime()));
  }
}
