/* eslint-disable no-undef */
class Weather {
  constructor(cities) {
    this.apiKey = '001bc132f62c2070651b5ae15d8df01b';
    this.cities = cities;
  }

  // Fetch weather from API
  async getWeather() {
    const citiesString = this.createApiSting();
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/group?id=${citiesString}&units=metric&appid=${
        this.apiKey
      }`,
    );

    const responseData = await response.json();

    return responseData.list;
  }

  createApiSting() {
    return this.cities.length === 1 ? this.cities[0] : this.cities.join();
  }
}
