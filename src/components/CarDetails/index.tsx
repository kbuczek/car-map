import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Fetch from "../Fetch";
import ApiUrls from "../../api";
import "./index.css";

interface CarDetails {
  detailsInfo: {
    platesNumber: string;
    name: string;
    id: string;
    picture: { id: string };
    rangeKm: number;
    batteryLevelPct: number;
    reservation: string;
    status: string;
  };
  setDetailsInfo: React.Dispatch<React.SetStateAction<any>>;
}

const CarDetails: React.FunctionComponent<CarDetails> = ({
  detailsInfo,
  setDetailsInfo,
}) => {
  const [carData, setCarData] = useState();

  // useEffect(() => {
  //   if (detailsInfo !== {}) {
  //     Fetch(ApiUrls.vehicleDetails + detailsInfo, "GET").then((data) =>
  //       setCarData(data)
  //     );
  //   }
  // }, [detailsInfo]);

  if (detailsInfo.id === "") {
    return null;
  }

  return (
    <article className={`car-details ${detailsInfo && "show"}`}>
      <div className="car-details-header">
        <div className="car-details-title">Informacje szczegółowe pojazdu</div>
        <div
          className="car-details-close"
          onClick={() =>
            setDetailsInfo({
              platesNumber: "",
              name: "",
              id: "",
              picture: { id: "" },
              rangeKm: -1,
              batteryLevelPct: -1,
              reservation: "",
              status: "",
            })
          }
        >
          <IoClose size={30} />
        </div>
      </div>
      <hr style={{ marginTop: "4px", marginBottom: "6px" }} />
      <div className="car-details-desc">Nazwa</div>
      <div className="car-details-text">{detailsInfo.name}</div>
      <div className="car-details-desc">Numer tablic rejestracyjnych</div>
      <div className="car-details-text">{detailsInfo.platesNumber}</div>
      <img src={ApiUrls.vehiclePhoto + detailsInfo.picture.id} />
      <div className="car-details-desc">Status pojazdu</div>
      <div className="car-details-text">
        {detailsInfo.status === "AVAILABLE" ? "dostępny" : "niedostępny"}
        {", "}
        {detailsInfo.reservation ? "zarezerwowany" : "brak rezerwacji"}
      </div>
      <div className="car-details-desc">Poziom naładowania baterii</div>
      <div className="car-details-text">{detailsInfo.batteryLevelPct}%</div>
      <div className="car-details-desc">Przybliżony zasięg pojazdu</div>
      <div className="car-details-text">{detailsInfo.rangeKm}km</div>
    </article>
  );
};

export default CarDetails;
