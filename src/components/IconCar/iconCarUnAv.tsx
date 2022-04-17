import L from "leaflet";
import "./iconCar.css";

const iconCarUnAv = new L.Icon({
  iconUrl: require("../../icons/car-unavailable.png"),
  iconSize: new L.Point(60, 24),
  className: "iconCar",
});

export { iconCarUnAv };
