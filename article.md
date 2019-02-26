Fast and Furious E2E: Using Testcafe for Easy End-to-End Testing
---

Building automated tests is the "Liver and Onions" of the programming world. Everyone agrees that it's good for you, but no one really wants to get into it. When anyone starts, many questions quickly come to mind: "What testing framework should I use in a chaotic world, and will it still be valid, years from now", "what are the things I should be testing", and "how much time do I really have to set these things up" are three avenues of questioning that quickly become familiar to the developer world.

If you find yourself there, then I have good news for you: There is a testing framework for E2E that has legs, that is easy to set up, and is easy to execute.

And we're going to build some tests. Once we gloss over the types of testing, end where E2E sits, and where Testcafe came from.

## Understanding Testing

If you're new to automated testing, you should take a moment to learn the differences between the types of test which you would run. The four distinct categories of tests are "Static Testing', 'Unit Testing', 'Integration Testing', and 'End to End Testing'. The first type, static, deals with errors a programmer may make while typing the code, such as syntax or patterns which linters can observe as bad. Unit Testing is the next step up, where you are looking at a single function in isolation. Integration testing looks at many of these functions when together, and finally, End-to-end (E2E) looks at what results from specific interactions. If you want to learn more about this, then I suggest reading into this article by Kent C Dodds, who brilliantly summarizes this topic.

## What is Testcafe

![Testcafe Logo](https://raw.githubusercontent.com/DevExpress/testcafe/master/media/testcafe-logo.svg?sanitize=true)

Testcafe is a fully-integrated E2E testing library written for NodeJS (Node). It was borne from the difficulty of building testing E2E platforms which relied on other technologies, so that teams can focus chiefly on the tests, as opposed to the framework which runs the tests. Testcafe comes from [Developer Express](https://www.devexpress.com/), a services shop that specializes in dashboards and other user interface components for the Microsoft proprietary ecosystem. 

There are many extensions available for this testing suite including for browserstack, and it also offers a UI-based testing tool for automated E2E tests at cost. Because it operates as a standalone E2E entity, it doesn't need to integrate with modern Javascript frameworks to test many things. But for special cases, there is a rich plugin ecosystem that allows users to integrate if this is something that's really needed. 

## Building E2E Tests

**If you are stuck, [this link](https://github.com/sparkgeo/testcafe-introduction-examples/branches) contains stepped solutions for each of the sections of this tutorial**. 

In this tutorial, we're going to build fictional E2E tests for [Leaflet](https://leafletjs.com/), and how Testcafe can be used to capture changes to DOM elements, as well as network request. To follow this tutorial, you're going to require the following:

1. A text editor. My preference is [VSCode](https://code.visualstudio.com/).
2. A command line terminal. This tutorial is writen for a Mac or Linux machine. 
3. Git. It comes with Linux or Mac, but Windows users can find it [here](https://code.visualstudio.com/)
4. NodeJS, at least at version 8.15 (lts/carbon). 

This list makes up a common toolsuite for developers. If you're building applications in React, Ember, or Vue, there's a good chance you already have all of these things. 

### Start the project

To start things, you're going to want to open your preferred terminal, and start a new directory:

```sh
  mkdir e2e-sample && cd e2e-sample
  git init
  touch README.md && echo "# End to End Testing with Testcafe" > README.md
  npm init
```

This will then start up Node's CLI process for building a new application. Run through all of the questions, and once finished, add a .gitignore file to ensure we don't commit the wrong things with the following:

```sh
  wget https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
  mv Node.gitignore .gitignore
```

This is a good time to commit. 

```sh
  git add . & git commit -m "🎉 Basic repo" 
```

### Install the Dependencies ([branch](https://github.com/sparkgeo/testcafe-introduction-examples/tree/1-starter))

In order to run Testcafe, all you need is something capable of serving HTML from static files, and Testcafe itself. The following are all we need to do our thing!

```sh
  npm i -D testcafe http-server
```

This installs the dependencies as "dev-dependencies". This means that these tools are part of the development environment, but will not be built as part of the production environment. Once you've installed, this is a decent time to commit again. 

```sh
  git add .
  git commit -m "➕ Testcafe and http-server"
```

### Build the Sandbox ([branch](https://github.com/sparkgeo/testcafe-introduction-examples/tree/2-build-a-sandbox)]

Because we're testing a Leaflet, a Javascript library, as opposed to a client application, this means that we need to construct a sandbox for the purposes of testing. To start the sandbox, we're going to want to build a new directory, add some HTML and JS that uses the library, then add a NPM command which serves the sandbox:

```sh
  mkdir sandbox && touch ./sandbox/index.html ./sandbox/index.js
```

And from inside your text editor, add the HTML and JS!

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- LEAFLET STYLES -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/leaflet.css"
    />
    <link rel="stylesheet" href="../common-style.css" />
  </head>
  <body>
    <header><h2>Leaflet Acceptance Sandbox</h2></header>
    <div class="container">
      <div id="map"></div>
      <div class="button-group-container">
        <div class="button-group">
          <button id="addLayer">Add OSM Layer</button>
          <div
            class="button-status button-not-engaged"
            id="addLayerStatus"
          ></div>
        </div>
        <div class="button-group">
          <button id="panMap">Pan Map</button>
          <div class="button-status button-not-engaged" id="panMapStatus"></div>
        </div>
        <div class="button-group">
          <button id="zoomMap">Zoom Map</button>
          <div
            class="button-status button-not-engaged"
            id="zoomMapStatus"
          ></div>
        </div>
        <div class="button-group">
          <button id="addCycleLayer">Add Open Cycle Map Layer</button>
          <div
            class="button-status button-not-engaged"
            id="addCycleLayerStatus"
          ></div>
        </div>
        <div class="button-group">
          <button id="addWMSLayer">Add WMS Layer</button>
          <div
            class="button-status button-not-engaged"
            id="addWMSLayerStatus"
          ></div>
        </div>
        <div class="button-group">
          <button id="addMarker">Add Marker Layer</button>
          <div
            class="button-status button-not-engaged"
            id="addMarkerStatus"
          ></div>
        </div>
        <div class="button-group">
          <button id="clickMarker">Click on Marker Layer</button>
          <div
            class="button-status button-not-engaged"
            id="clickMarkerStatus"
          ></div>
        </div>
        <h2>Values for Integration Tests</h2>
        <div class="button-group">
          <div class="infobox-label">Map Centre</div>
          <input class="infobox-value" id="mapCenter" />
        </div>
        <div class="button-group">
          <div class="infobox-label">Zoom Level</div>
          <input class="infobox-value" id="zoomLevel" />
        </div>
        <div class="button-group">
          <div class="infobox-label">Maptiks Trackcode</div>
          <input class="infobox-value" id="trackingCode" />
        </div>
        <div class="button-group">
          <div class="infobox-label">Bounding Box</div>
          <input class="infobox-value" id="mapBounds" />
        </div>
        <div class="button-group">
          <div class="infobox-label">Marker Location</div>
          <input class="infobox-value" id="markerLocation" />
        </div>
      </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/leaflet.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
```

```js
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
    '#addLayer',
    '#zoomMap',
    '#panMap',
    '#addCycleLayer',
    '#addMarker',
    '#clickMarker'
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

  // ADD LAYER TEST FUNCTIONALITY
  document.querySelector('#addLayer').addEventListener('click', () => {
    L.tileLayer(osmLayer, {
      attribution: osmLayerAttribution
    }).addTo(map);
  });

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
    marker = L.marker(defaultCenter).addTo(map);
    document.querySelector('#markerLocation').value = defaultCenter.reverse();
  });

  // Click on Marker Layers
  document.querySelector('#clickMarker').addEventListener('click', () => {
    marker.fire('click');
  });
}(window.L));
```

Finally, modify the package.json file to run the sandbox with http-server. Add the following line into the "scripts" object:

```json
"sandbox": "http-server ./sandbox -p 3001"
```

With this line in your package.json file, you should be able to run `npm run sandbox` in the terminal window. 
![sandbox](https://user-images.githubusercontent.com/6225122/53445399-792c9a80-39de-11e9-968b-d7a418526657.png)

If the server starts, you should be able to go to [http://localhost:3001](http://localhost:3001). There, you should see something like this:

![sandbox](https://user-images.githubusercontent.com/6225122/53445520-b5f89180-39de-11e9-832a-69763be69ad3.png)

This is a sandbox that tests the leaflet library. It simulates a pan to a random coordinate, a random zoom, changing the layer, and adding a marker to the centre of the map at the last pan. 

Now is a good time to commit. 

```sh
  git add . && git commit -m "✨  Functional sandbox in leaflet"
```
