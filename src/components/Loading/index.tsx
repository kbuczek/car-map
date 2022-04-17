import React from "react";
import "./index.css";

const index = () => {
  return (
    <div className="loading">
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-text">Ładownie danych</div>
      </div>
    </div>
  );
};

export default index;
