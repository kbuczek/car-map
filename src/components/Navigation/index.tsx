import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./index.css";

interface Navig {
  mapFilters: {
    status: string;
    type: string;
    battery: string;
    range: string;
  };
  setMapFilters: React.Dispatch<React.SetStateAction<any>>;
}

const Navig: React.FunctionComponent<Navig> = ({
  mapFilters,
  setMapFilters,
}) => {
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setMapFilters({ ...mapFilters, [name]: value });
  };

  return (
    <nav className="navig">
      <div id="navig-name">Car Map</div>
      <section className="navig-form">
        <Form.Group>
          <span>Status pojazdu</span>
          <Form.Select
            name="status"
            value={mapFilters.status}
            onChange={handleChange}
          >
            <option value="ALL">Wszystkie</option>
            <option value="AVAILABLE">Dostępne</option>
            <option value="UNAVILABLE">Niedostępne</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <span>Typ pojazdu</span>
          <Form.Select
            name="type"
            value={mapFilters.type}
            onChange={handleChange}
          >
            <option value="ALL">Wszystkie</option>
            <option value="CAR">Auto osobowe</option>
            <option value="TRUCK">Ciężarówka</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <span>Poziom naładownia baterii</span>
          <Form.Select
            name="battery"
            value={mapFilters.battery}
            onChange={handleChange}
          >
            <option value="ALL">Wszystkie</option>
            <option value="75">75% - 100%</option>
            <option value="50">50% - 75%</option>
            <option value="25">25% - 50%</option>
            <option value="0">0% - 25%</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <span>Zasięg pojazdu</span>
          <Form.Select
            name="range"
            value={mapFilters.range}
            onChange={handleChange}
          >
            <option value="ALL">Wszystkie</option>
            <option value="150">Powyżej 150km</option>
            <option value="100">100 - 150km</option>
            <option value="50">50 - 100km</option>
            <option value="0">0 - 50km</option>
          </Form.Select>
        </Form.Group>
      </section>
      <div></div>
    </nav>
  );
};

export default Navig;
