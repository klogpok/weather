"use strict";

const citiesByDefault = [293397, 2643743, 6455259, 524901, 3067696, 2950159, 6542283, 6356055];
const weather = new Weather(citiesByDefault);
const ui = new UI();
const map = new Map();
let cities = [];
let mymap = '';
const markers = [];

const watchMap = () => {
    mymap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            const city = cities.find(item => item.id === layer.options.customId);
            layer.on('click', () => {
                ui.renderCity(city);
                map.updateMap(layer, city, mymap.getZoom());
            });
            markers.push(layer);
        }
    });
};

const getWeather = () => {
    weather
        .getWeather()
        .then((results) => {
            cities = results;
            ui.renderSelectCities(results);
            ui.renderCity(cities[0]);
            mymap = map.initMap(cities);
            watchMap();
        })
        .catch(err => console.log(err));
};

const changeCity = (event) => {
    const city = cities.find(item => item.id === +event.target.value);
    const marker = markers.find(elem => elem.options.customId === +event.target.value);
    ui.renderCity(city);
    map.updateMap(marker, city, mymap.getZoom());
};

document.getElementById('w-changeCity').addEventListener('change', changeCity);

document.addEventListener('DOMContentLoaded', getWeather);
