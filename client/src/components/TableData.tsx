import "../components/TableData.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
var axios = require("axios").default;

var obj: {
  Device_ID: string;
  Device_Name: string;
  Device_Type: string;
  Device_Make: string;
  Device_Model: string;
  DateTime: string;
  Wattage: string;
} = {
  Device_ID: "9e4087db",
  Device_Name: "Fridge 2",
  Device_Type: "Fridge",
  Device_Make: "LG",
  Device_Model: "LFC20786ST",
  DateTime: "2019-04-29T07:19:00.000Z",
  Wattage: "56.72",
};

const TableData: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = useState([obj]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(`http://localhost:5000/devices/${id}`);
      setData(req.data);
      setIsLoaded(true);
    }
    fetchData();
  }, [id]);

  return (
    <div className="TableData">
      {isLoaded && (
        <div className="table_container">
          <h3 className="table_heading">Device Name : {data[0].Device_Name}</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Device_Name</TableCell>
                  <TableCell align="right">Device_ID</TableCell>
                  <TableCell align="right">Device_Type</TableCell>
                  <TableCell align="right">DateTime</TableCell>
                  <TableCell align="right">Wattage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.DateTime}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.Device_Name}
                    </TableCell>
                    <TableCell align="right">{row.Device_ID}</TableCell>
                    <TableCell align="right">{row.Device_Type}</TableCell>
                    <TableCell align="right">{row.DateTime}</TableCell>
                    <TableCell align="right">{row.Wattage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {!isLoaded && <div>Please Select a Device</div>}
    </div>
  );
};

export default TableData;
