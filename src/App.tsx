import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { iconCarAv } from "./components/IconCar/iconCarAv";
import { iconCarUnAv } from "./components/IconCar/iconCarUnAv";
import { iconTruckAv } from "./components/IconCar/iconTruckAv";
import { iconTruckUnAv } from "./components/IconCar/iconTruckUnAv";
import CarDetails from "./components/CarDetails";
import Loading from "./components/Loading";
import MarkerClusterGroup from "react-leaflet-markercluster";
import carsData from "./data/cars.json";
import ApiUrls from "./api";
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
  const allCarsData = carsData;

  const [mapFilters, setMapFilters] = useState<mapFilters>({
    status: "ALL",
    type: "ALL",
    battery: "ALL",
    range: "ALL",
  });

  // useEffect(() => {
  //   FetchData();
  // }, []);

  //filtrowanie danych
  useEffect(() => {
    let currentVehicleData = allCarsData;

    if (mapFilters.status !== "ALL") {
      const newVehicleData = currentVehicleData.objects.filter(
        (item) => item.status === mapFilters.status
      );
      const newVehicleData2 = { objects: newVehicleData };
      currentVehicleData = newVehicleData2;
    }

    if (mapFilters.type !== "ALL") {
      const newVehicleData = currentVehicleData.objects.filter(
        (item) => item.type === mapFilters.type
      );
      const newVehicleData2 = { objects: newVehicleData };
      currentVehicleData = newVehicleData2;
    }

    if (mapFilters.battery !== "ALL") {
      const newVehicleData = currentVehicleData.objects.filter(
        (item) =>
          item.batteryLevelPct > parseInt(mapFilters.battery) &&
          item.batteryLevelPct <= parseInt(mapFilters.battery) + 25
      );
      const newVehicleData2 = { objects: newVehicleData };
      currentVehicleData = newVehicleData2;
    }

    if (mapFilters.range !== "ALL") {
      const newVehicleData = currentVehicleData.objects.filter(
        (item) =>
          item.rangeKm > parseInt(mapFilters.range) &&
          item.rangeKm <= parseInt(mapFilters.range) + 50
      );
      const newVehicleData2 = { objects: newVehicleData };
      currentVehicleData = newVehicleData2;
    }

    setVehicleData(currentVehicleData);
  }, [mapFilters]);

  // const FetchData = async () => {
  //   try {
  //     const response = await fetch(ApiUrls.vehicles, {
  //       method: "GET",
  //       mode: "cors",
  //     });

  //     if (response.status !== 200) {
  //       throw new Error("cannot fetch data");
  //     }
  //     const data = await response.json();
  //     setVehicleData(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
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
                  <div style={{ fontWeight: 800 }}>{item.name}</div>
                  <hr style={{ padding: 0, margin: 0, marginBottom: "8px" }} />
                  {item.status === "AVAILABLE"
                    ? "DOSTĘPNY"
                    : "NIEDOSTĘPNY"}{" "}
                  <br /> Zasięg: {item.rangeKm} km
                  <br /> Bateria: {item.batteryLevelPct}% <br />
                  <br />
                  {/* <hr /> */}
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
          <Polygon
            positions={[
              [
                [52.244341, 21.000931],
                [52.246591, 20.999411],
                [52.249256, 20.998729],
                [52.249595, 21.002305],
                [52.250181, 21.004062],
                [52.246568, 21.011517],
                [52.245798, 21.004636],
              ],
            ]}
          />
        </MarkerClusterGroup>
      </MapContainer>
      <CarDetails detailsInfo={detailsInfo} setDetailsInfo={setDetailsInfo} />
    </main>
  );
}

export default App;
