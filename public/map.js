class Map {
    constructor() {
        this.mapToken = 'pk.eyJ1Ijoia2xvZ3BvayIsImEiOiJjanVsazl0MDMyMWV5NGFxajFvZmU3OWhjIn0.hJj8cBF43-0nyxSUpRQN6w';
        this.mymap = '';
        this.markers = [];
    }

    initMap(cities) {
        this.mymap = L.map('map', {center: [cities[0].coord.lat, cities[0].coord.lon], zoom: 10});

        L.tileLayer(
            `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${this.mapToken}`,
            {
                maxZoom: 16,
                id: 'mapbox.streets',
                accessToken: this.mapToken,
            },
        ).addTo(this.mymap);

        this.markers = this.createMarkers(cities);
        this.changeMarkerColor(this.markers[0], 'green');

        return this.mymap;
    }

    updateMap(marker, city, zoom) {
        this.mymap.setView(new L.LatLng(city.coord.lat, city.coord.lon), zoom);
        this.changeMarkerColor(marker, 'green');
        this.setDefaultMarkerColor(this.markers, city.id);
    }

    createMarkers(cities) {
        return cities.map(city => this.createMarker(city));
    }

    createMarker(city) {
        return L.marker([city.coord.lat, city.coord.lon], {
            icon: this.createIcon('blue'),
            customId: city.id,
        })
            .addEventListener('click', (e) => {
                this.updateMap(e.target, city, this.mymap.getZoom());
            })
            .bindTooltip(`${city.name}, ${city.sys.country}`)
            .openTooltip()
            .addTo(this.mymap);
    }

    createIcon(color) {
        return new L.Icon({
            iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            tooltipAnchor: [10, -30],
            shadowSize: [41, 41],
        });
    }

    changeMarkerColor(marker, color) {
        marker.setIcon(this.createIcon(color));
    }

    setDefaultMarkerColor(markers, cityId) {
        markers.forEach((marker) => {
            if (marker.options.customId !== cityId) {
                this.changeMarkerColor(marker, 'blue');
            }
        });
    }
}
