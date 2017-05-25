  'use strict';

  var map = L.map('map', { 
      center:[36.383942,-6.652195],
      zoom: 5,
      maxZoom:18,
      minZoom:1,
      maxBounds : L.latLngBounds(L.latLng(-200, -280), L.latLng(200, 280)),
      });
// custom control para leyenda
    var ourCustomLegend = L.Control.extend({  
  options: {
    position: 'bottomright', 
    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
    },  
   onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.setAttribute("id", "legend");
    container.style.backgroundColor = 'white';
    container.style.width = '200px';
    //nota mia, no es necesari hight ya que por defecto se ajusta al contenido 
    return container;
    }
  });

  map.addControl(new ourCustomLegend());
  var legendHtml= '';
   debugger;
   legendHtml += '<div class="col-md-10" style="padding-left:5px"><h4 style="margin-top:0px; margin-bottom:5px;">Legend</h></div>'+
          '<div class="toggle-legend-icon">'+
          '</div>'+
          '<div id="legend1">'+
          '<div class="col-md-12 icon"> <img width="20px" height="15px" style="margin-left:0px; margin-right:5px; margin-bottom:2.5px" src="img/fountain.png"/>'+
    '<span style="font-size:15px">Fuentes</span></div>'
          '</div>'
   $('#legend').html(legendHtml);

  // termina custom control leyenda//
  
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
  var myIcon = L.icon({
    iconUrl: 'img/fountain.png',
    iconSize: [40, 40],
    iconAnchor: [40, 40]
});
  //forma rapida para pop up e icono

  var fuente=L.geoJson(fuentes,{pointToLayer:function(geoJsonPoint, latlng) {
    var popup = L.popup()
    .setLatLng(latlng)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>');
    return L.marker(latlng,{icon:myIcon}).bindPopup(popup);
  //buena forma con each poner 
}
}).addTo(map);
  var overlay ={
    "fuentes": fuente,
  }
  var layerControl = L.control.layers(baseLayers,overlay).addTo(map);