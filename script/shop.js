mapboxgl.accessToken = 'pk.eyJ1IjoiYXJjZmVqIiwiYSI6ImNrMnhoazQyeDBicmYzYnBkbHF0cXp2anYifQ.esr-RTeyjx4JbwgctD1ykA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-2.992313, 56.455915],
  zoom: 14,
});

var geojson = {
  type: 'FeatureCollection',
  features: [
      {
        type: 'Feature',
        geometry: {
          type: "Point",
          coordinates: [-2.992313, 56.455915]
        },
        properties: {
          title: 'The Little Green Larder',
          description: 'The Little Green Larder offers a plastic free shopping experience, with zero waste alternatives to inspire us to create a greener future.'
        }
    }
  ]
};

// add markers to map
geojson.features.forEach(function(marker) {
  // create a HTML element for each shop
  var el = document.createElement('i');
  el.className = 'marker';

  // make a marker for each shop and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>')
      .addTo(map))
    .addTo(map);
});

function loadBasket() {

  var basket = localStorage.getItem('basket');

  if (basket === null) {
    basket = {
      products: []
    };
  } else {
    basket = JSON.parse(basket);
  }

  return basket;
}

function countBasketItems() {
  var basket = loadBasket();

  var basketCounters = document.getElementsByClassName('basket-counter');

  for (var i = 0; i < basketCounters.length; i++) {
    
    basketCounters[i].innerHTML = `${basket.products.length}`
  }
}

window.onload = countBasketItems();
