import { Grid } from "@mui/material";
import React from "react";
import "../components/TopInfo.css";
import Chart from "./Chart";

const TopInfo: React.FC = () => {
  return (
    <div className="topInfo">
      <h1 className="topInfo_heading">Smart Home Data Visualization</h1>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <p className="topInfo_text">
            This Website shows the visualization data of a Smart Home which has
            several devices like Fridge, Microvave, Vacuum etc. There is also
            "Main" power source which is connected to every device and shows
            variations in readings according to number of devices connected in
            the whole apartment. Data is Visualized using Line Chart and First
            Line Chart shows "Mains" readings Wattage (y-axis) Vs Date Time
            (x-axis). Then There is a Drop Menu to select particular device
            data. The data for particul device is shown in two format Line Chart
            and Table.
          </p>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Chart id="mains" />
        </Grid>
      </Grid>
    </div>
  );
};

export default TopInfo;
