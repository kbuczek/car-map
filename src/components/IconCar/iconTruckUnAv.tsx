import L from "leaflet";
import "./iconCar.css";

const iconTruckUnAv = new L.Icon({
  iconUrl: require("../../icons/truck-unavailable.png"),
  iconSize: new L.Point(62, 28),
  className: "iconCar",
});

export { iconTruckUnAv };
