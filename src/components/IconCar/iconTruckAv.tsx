import L from "leaflet";
import "./iconCar.css";

const iconTruckAv = new L.Icon({
  iconUrl: require("../../icons/truck-available.png"),
  iconSize: new L.Point(62, 28),
  className: "iconCar",
});

export { iconTruckAv };
