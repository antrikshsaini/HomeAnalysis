import moment from "moment";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import "../components/Chart.css";
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

const Chart: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = useState([obj]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (id !== "mains") {
        const req = await axios.get(`http://localhost:5000/devices/${id}`);
        req.data.forEach((d: { DateTime: moment.MomentInput }) => {
          d.DateTime = moment(d.DateTime).valueOf(); //converting to milliseconds
        });
        setData(req.data);
      } else {
        const req = await axios.get(`http://localhost:5000/${id}`);
        req.data.forEach((d: { DateTime: moment.MomentInput }) => {
          d.DateTime = moment(d.DateTime).valueOf();
        });
        setData(req.data);
      }
      setIsLoaded(true);
    }
    fetchData();
  }, [id]);

  const DateFormatter = (date: moment.MomentInput) => {
    // return moment(date).unix();
    return moment(date).format("MM/YYYY HH:mm");
  };

  return (
    <div className="chart">
      <h1>Readings Visualization using Line Chart</h1>
      {isLoaded && (
        <LineChart width={1400} height={500} data={data}>
          <Line
            type="monotone"
            dataKey="Wattage"
            stroke="black"
            strokeWidth={2}
            dot={false}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={"DateTime"}
            domain={[data[0].DateTime, data[data.length - 1].DateTime]}
            scale="time"
            type="number"
            tickFormatter={DateFormatter}
          />
          <YAxis type="number" domain={[0, 2000]} />
        </LineChart>
      )}
      {!isLoaded && <div>Chart is loading</div>}
    </div>
  );
};

export default Chart;
