import L from "leaflet";
import "./iconCar.css";

const iconCarAv = new L.Icon({
  iconUrl: require("../../icons/car-available.png"),
  iconSize: new L.Point(60, 24),
  className: "iconCar",
});

export { iconCarAv };
