import L from "leaflet";

const iconCar = new L.Icon({
  iconUrl: require("../car.png"),
  iconRetinaUrl: require("../car.png"),
  //   iconAnchor: ,
  //   popupAnchor: null,
  //   shadowUrl: null,
  //   shadowSize: null,
  //   shadowAnchor: null,
  iconSize: new L.Point(80, 40),
  className: "leaflet-div-icon",
});

export { iconCar };
