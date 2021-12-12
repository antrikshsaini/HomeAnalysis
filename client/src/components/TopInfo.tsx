import React from "react";
import "../components/TopInfo.css";
import Chart from "./Chart";

const TopInfo: React.FC = () => {
  return (
    <div className="topInfo">
      <h1>Smart Home Data Visualization</h1>
      <div className="charts">
        <Chart id="mains" />
      </div>
    </div>
  );
};

export default TopInfo;
