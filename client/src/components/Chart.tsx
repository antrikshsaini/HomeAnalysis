import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
    return moment(date).format("29 MMMM HH:mm");
  };

  return (
    <div className="chart">
      {isLoaded && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <Tooltip labelFormatter={DateFormatter} />
            <Legend />
            <Line
              type="monotone"
              dataKey="Wattage"
              stroke="#8884d8"
              strokeWidth={1}
              dot={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={"DateTime"}
              domain={[data[0].DateTime, data[data.length - 1].DateTime]}
              scale="time"
              type="number"
              height={10}
              tickFormatter={DateFormatter}
            />
            <YAxis type="number" domain={[0, 3000]} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {!isLoaded && <div>Chart is loading</div>}
    </div>
  );
};

export default Chart;
