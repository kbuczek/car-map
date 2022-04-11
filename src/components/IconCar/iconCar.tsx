import L from "leaflet";
import "./iconCar.css";

const iconCar = new L.Icon({
  iconUrl: require("../../car.png"),
  iconSize: new L.Point(80, 40),
  className: "iconCar",
});

export { iconCar };
