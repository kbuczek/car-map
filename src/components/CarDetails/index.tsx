import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Fetch from "../Fetch";
import ApiUrls from "../../api";
import "./index.css";

interface CarDetails {
  detailsInfo: string;
  setDetailsInfo: React.Dispatch<React.SetStateAction<any>>;
}

const CarDetails: React.FunctionComponent<CarDetails> = ({
  detailsInfo,
  setDetailsInfo,
}) => {
  const [carData, setCarData] = useState();

  useEffect(() => {
    Fetch(ApiUrls.vehicleDetails + detailsInfo, "GET").then((data) =>
      setCarData(data)
    );
  }, []);

  if (detailsInfo === "") {
    return null;
  }

  return (
    <article className={`car-details ${detailsInfo !== "" && "show"}`}>
      <div className="car-details-header">
        <div>Informacje szczegółowe pojazdu</div>
        <div onClick={() => setDetailsInfo("")}>
          <IoClose />
        </div>
      </div>
      <div>{carData}</div>
    </article>
  );
};

export default CarDetails;
