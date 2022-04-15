import React from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { iconCar } from "./components/IconCar/iconCar";
import carsData from "./data/cars.json";

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <div className="app-name">CAR MAP</div>
        {/* <Card> */}
        <section className="app-form">
          <Form.Group>
            <Form.Select>
              <option disabled selected>
                Dostępność pojazdu
              </option>
              <option>Dostępne</option>
            </Form.Select>
          </Form.Group>
          <div>Wybierz typ pojazdu</div>
          <div>Poziom naładownia baterii</div>
          <div>Zasięg pojazdu</div>
        </section>
        <div></div>
        {/* </Card> */}
      </header>
      <MapContainer center={[52.22977, 21.01178]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {carsData.objects.map((item, index) => {
          return (
            <Marker
              key={index}
              position={[item.location.latitude, item.location.longitude]}
              icon={iconCar}
            >
              <Popup>
                {item.name} <br /> {item.status} <br /> Zasięg: {item.rangeKm}{" "}
                km
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </main>
  );
}

export default App;
