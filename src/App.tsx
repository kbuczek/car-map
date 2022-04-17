import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { iconCarAv } from "./components/IconCar/iconCarAv";
import { iconCarUnAv } from "./components/IconCar/iconCarUnAv";
import { iconTruckAv } from "./components/IconCar/iconTruckAv";
import { iconTruckUnAv } from "./components/IconCar/iconTruckUnAv";
import CarDetails from "./components/CarDetails";
import Loading from "./components/Loading";
import MarkerClusterGroup from "react-leaflet-markercluster";
import carsData from "./data/cars.json";
import ApiUrls from "./api";
// import useFetch from "./components/useFetch";
// import Fetch from "./components/Fetch";
import Button from "react-bootstrap/Button";
import "./App.css";

interface mapFilters {
  status: string;
  type: string;
  battery: string;
  range: string;
}

interface vehicleData {
  objects: [];
}

interface detailsInfo {
  platesNumber: string;
  name: string;
  id: string;
  picture: { id: string };
  rangeKm: number;
  batteryLevelPct: number;
  reservation: string;
  status: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(carsData);
  const [detailsInfo, setDetailsInfo] = useState<detailsInfo>({
    platesNumber: "",
    name: "",
    id: "",
    picture: { id: "" },
    rangeKm: -1,
    batteryLevelPct: -1,
    reservation: "",
    status: "",
  });

  const [mapFilters, setMapFilters] = useState<mapFilters>({
    status: "ALL",
    type: "ALL",
    battery: "ALL",
    range: "ALL",
  });

  // useEffect(() => {
  //   FetchData();
  // }, []);

  useEffect(() => {
    switch (mapFilters.status) {
      case "AVAILABLE":
        const newVehicleData = vehicleData.objects.filter(
          (item) => item.status === "AVAILABLE"
        );
        const newVehicleData2 = { objects: newVehicleData };
        setVehicleData(newVehicleData2);
        break;
      case "UNAVAILABLE":
        const newVehicleData3 = vehicleData.objects.filter(
          (item) => item.status === "UNAVAILABLE"
        );
        const newVehicleData4 = { objects: newVehicleData3 };
        setVehicleData(newVehicleData4);
        break;
      default:
        setVehicleData(carsData);
    }
  }, [mapFilters.status]);

  useEffect(() => {
    switch (mapFilters.type) {
      case "CAR":
        setVehicleData(carsData);
        const newVehicleData = vehicleData.objects.filter(
          (item) => item.type === "CAR"
        );
        const newVehicleData2 = { objects: newVehicleData };
        setVehicleData(newVehicleData2);
        break;
      case "TRUCK":
        setVehicleData(carsData);
        const newVehicleData3 = vehicleData.objects.filter(
          (item) => item.type === "TRUCK"
        );
        const newVehicleData4 = { objects: newVehicleData3 };
        setVehicleData(newVehicleData4);
        break;
      default:
        setVehicleData(carsData);
    }
  }, [mapFilters.type]);

  const FetchData = async () => {
    try {
      const response = await fetch(ApiUrls.vehicles, {
        method: "GET",
        mode: "no-cors",
      });

      console.log(response);

      // if (response.status !== 200) {
      //   throw new Error("cannot fetch data");
      // }
      const data = await response.json();
      // setVehicleData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // const changeMapFilters = () => {
  // if (mapFilters === "all") {
  //   setMenuItems(items);
  //   return;
  // }
  // const newItems = items.filter((item) => item.categor === category);
  // setMenuItems(newItems);
  // };

  const chooseCarIcon = (type: string, status: string) => {
    if (type === "CAR") {
      if (status === "AVAILABLE") {
        return iconCarAv;
      }
      return iconCarUnAv;
    }
    if (type === "TRUCK") {
      if (status === "AVAILABLE") {
        return iconTruckAv;
      }
      return iconTruckUnAv;
    }
    return iconCarUnAv;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="app">
      <Navigation mapFilters={mapFilters} setMapFilters={setMapFilters} />
      <MapContainer center={[52.22977, 21.01178]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {vehicleData.objects.map((item: any, index: number) => {
            return (
              <Marker
                key={index}
                position={[item.location.latitude, item.location.longitude]}
                icon={chooseCarIcon(item.type, item.status)}
              >
                <Popup>
                  {item.name} <br /> {item.status} <br /> Zasięg: {item.rangeKm}{" "}
                  km
                  <Button
                    onClick={() => {
                      setDetailsInfo(item);
                    }}
                  >
                    Informacje szczegółowe
                  </Button>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      <CarDetails detailsInfo={detailsInfo} setDetailsInfo={setDetailsInfo} />
    </main>
  );
}

export default App;
