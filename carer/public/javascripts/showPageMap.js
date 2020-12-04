mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
	center: carer.geometry.coordinates, // starting position [lng, lat]
	zoom: 8, // starting zoom
});

new mapboxgl.Marker().setLngLat(carer.geometry.coordinates).addTo(map);
