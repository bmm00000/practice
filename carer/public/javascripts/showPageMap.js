mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
	center: carer.geometry.coordinates, // starting position [lng, lat]
	zoom: 8, // starting zoom
});

new mapboxgl.Marker()
	.setLngLat(carer.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<h3>${carer.title}</h3><p>${carer.location}</p>`
		)
	)
	.addTo(map);
