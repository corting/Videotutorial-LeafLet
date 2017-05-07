  'use strict';

  var map = L.map('map', { 
      center:[36.383942,-6.652195],
      zoom: 5,
      maxZoom:18,
      minZoom:1,
      maxBounds : L.latLngBounds(L.latLng(-200, -280), L.latLng(200, 280)),
      });
  
  var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
  var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


  var baseLayers = {
    "Callejero": OpenStreetMap_Mapnik,
    "Satelite": Esri_WorldImagery,
  }
  var fuente=L.geoJson(fuentes).addTo(map);
  var overlay ={
    "fuentes": fuente,
  }
  var layerControl = L.control.layers(baseLayers,overlay).addTo(map);
  
 