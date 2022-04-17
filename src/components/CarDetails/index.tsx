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
        <div>Informacje szczegółowe pojazdu</div>
        <div
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
          <IoClose />
        </div>
      </div>
      <div>{detailsInfo.name}</div>
      <div>Numer tablicy rejstracyjnej: {detailsInfo.platesNumber}</div>
      <img src={ApiUrls.vehiclePhoto + detailsInfo.picture.id} />
      <div>
        {detailsInfo.status === "AVAILABLE" ? "dostępny" : "niedostępny"}
        {", "}
        {detailsInfo.reservation ? "zarezerwowany" : "brak rezerwacji"}
      </div>
      <div>{detailsInfo.batteryLevelPct}</div>
      <div>{detailsInfo.rangeKm}</div>
    </article>
  );
};

export default CarDetails;
