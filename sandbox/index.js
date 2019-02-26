(function (L) {
  const engageSwitch = elemId => {
    document.querySelector(`${elemId}Status`).classList.add('button-engaged');
    document.querySelector(`${elemId}Status`).classList.remove('button-not-engaged');
  };

  const updateInfoBoxes = () => {
    document.querySelector('#mapCenter').value = [
      parseFloat(map.getCenter().lng.toFixed(5)),
      parseFloat(map.getCenter().lat.toFixed(5))
    ];
    document.querySelector('#zoomLevel').value = map.getZoom();
    document.querySelector('#mapBounds').value = [
      parseFloat(map.getBounds()._southWest.lng.toFixed(5)),
      parseFloat(map.getBounds()._southWest.lat.toFixed(5)),
      parseFloat(map.getBounds()._northEast.lng.toFixed(5)),
      parseFloat(map.getBounds()._northEast.lat.toFixed(5))
    ];
  };

  // Generates a random integer between 6 and 22
  const randomZoomLevel = () => Math.floor(Math.random() * 16) + 6;
  const randomLonLat = () => [
    Math.floor(Math.random() * 360) - 180,
    Math.floor(Math.random() * 180) - 90
  ];

  [
    '#zoomMap',
    '#panMap',
    '#addCycleLayer',
    '#addMarker',
  ].forEach(elem => {
    document.querySelector(elem).addEventListener('click', () => {
      engageSwitch(elem);
    });
  });

  // MAP CONSTANTS
  const defaultCenter = [51.42, -116.22];
  let mapCenter = defaultCenter;
  const osmLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const cycleLayer = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';
  const osmLayerAttribution =
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const cycleLayerAttribution =
    'Maps &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

  // INITIALIZE MAP
  const map = L.map('map', {
    center: defaultCenter,
    zoom: 13,
  });

  map.on('layeradd', updateInfoBoxes);
  map.on('moveend', updateInfoBoxes);
  map.on('zoomend', updateInfoBoxes);

  // LAYER
  L.tileLayer(osmLayer, {
    attribution: osmLayerAttribution,
  }).addTo(map);

  // PAN MAP FUNCTIONALITY
  document.querySelector('#panMap').addEventListener('click', () => {
    mapCenter = randomLonLat();
    map.panTo(mapCenter, {
      animate: true
    });
    updateInfoBoxes();
  });

  // Zoom Map Functionality
  document.querySelector('#zoomMap').addEventListener('click', () => {
    map.setView(mapCenter, randomZoomLevel(), {
      animate: false
    });
  });

  // Add Open Cycle Map Layers
  document.querySelector('#addCycleLayer').addEventListener('click', () => {
    L.tileLayer(cycleLayer, {
      attribution: cycleLayerAttribution
    }).addTo(map);
  });

  // Add Marker Layers
  let marker;
  document.querySelector('#addMarker').addEventListener('click', () => {
    marker = L.marker(mapCenter).addTo(map);
    document.querySelector('#markerLocation').value = defaultCenter.reverse();
  });
}(window.L));
