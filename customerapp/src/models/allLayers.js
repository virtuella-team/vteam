import L from "leaflet";

const allLayers = {
  //vi kör featuregroup pga lättast då att binda funktioner till alla medlemmar (kartobjekt) i gruppen
  //så här initierar vi helt enkelt alla featurgroups (= lager i kartan) och sätter gemensamma funktioner
  //på alla ingående objekt, som popup och click enligt nedan
  cities: L.featureGroup().bindPopup(function (layer) {
    return layer.feature.properties.name;
  }),
  chargingStations: L.featureGroup().bindPopup(function (layer) {
    return layer.feature.properties.featureType;
  }),
  parkingLots: L.featureGroup().bindPopup(function (layer) {
    return layer.feature.properties.featureType;
  }),
  bikes: L.featureGroup().bindPopup(function (layer) {
    console.log(layer);
    return (
      "ID " +
      layer.feature.properties.id +
      " UTHYRD? " +
      layer.feature.properties.rented
    );
  }),
  workshops: L.featureGroup().bindPopup(function (layer) {
    return layer.feature.properties.name;
  }),
  zones: L.featureGroup().bindPopup(function (layer) {
    return (
      "TYP " +
      layer.feature.properties.type +
      "HASTIGHETSGRÄNS " +
      layer.feature.properties.speedLimit
    );
  }),
};

export default allLayers;
