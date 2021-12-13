import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../components/DropDown.css";
import TableData from "./TableData";
import Chart from "./Chart";
import { Grid } from "@mui/material";
var axios = require("axios").default;

var obj: { Device_ID: string; Device_Name: string } = {
  Device_ID: "",
  Device_Name: "",
};
const DropDown: React.FC = () => {
  const [data, setData] = useState([obj]);
  const [deviceId, setDeviceId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("http://localhost:5000/devices");
      setData(req.data);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setDeviceId(event.target.value as string);
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (isLoaded && deviceId) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={4}>
          <h3 className="dropDown_info">
            Please Select Particular device from the List
          </h3>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Device Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deviceId}
              label="Device Name"
              onChange={handleChange}
            >
              {data.map((item) => {
                return (
                  <MenuItem value={item.Device_ID}>{item.Device_Name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Chart id={deviceId} />
        </Grid>
        <Grid item xs={12}>
          <TableData id={deviceId} />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={4}>
          <h3 className="dropDown_info">
            Please Select Particular device from the List
          </h3>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Device Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deviceId}
              label="Device Name"
              onChange={handleChange}
            >
              {data.map((item) => {
                return (
                  <MenuItem value={item.Device_ID}>{item.Device_Name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
};

export default DropDown;
