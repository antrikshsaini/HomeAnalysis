import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../components/DropDown.css";
import TableData from "./TableData";
import Chart from "./Chart";
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
  return (
    <div className="DropDown">
      {isLoaded && (
        <div className="wrapper">
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
                // console.log(item.Device_Name);
                return (
                  <MenuItem value={item.Device_ID}>{item.Device_Name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Chart id={deviceId} />
          <TableData id={deviceId} />
        </div>
      )}
      {!isLoaded && <div>Loading...</div>}
    </div>
  );
};

export default DropDown;
