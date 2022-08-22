import "./App.css";
import React, { useState } from "react";

// Primereact
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";

import "../node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/md-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

// Chart
const LineChart = ({ chartData }) => {
  let timeOfDay = chartData.properties.timeseries

  const finalData = {
    labels: timeOfDay.map(({ time }) => time),
    datasets: [{
      data: timeOfDay.map(({ data: { instant: { details: { air_temperature }}} }) => air_temperature),
      label: "Temperature",
      fill: false,
      borderColor: "#42A5F5",
      tension: 0.4,
    }]
  }

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return { basicOptions };
  };
  const { basicOptions } = getLightTheme();
  return (
    <div>
      <div className="card">
        <Chart type="line" data={finalData} options={basicOptions} />
      </div>
    </div>
  );
}

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [allData, setAllData] = useState(null);

  const fetchResult = () => {
    fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setAllData(result);
      });
  };

  return (
    <div className="App">
      <div className="weather-app p-component">
        <h2>yr.no test</h2>
        <div className="flex flex-wrap py-2 justify-content-center card-container">
          <span className="p-float-label">
            <InputText
              id="input_txt"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
            <label htmlFor="input_txt" className="p-component">
              Latitude
            </label>
          </span>
        </div>
        <div className="flex flex-wrap py-2 justify-content-center card-container">
          <span className="p-float-label">
            <InputText
              id="input_txt"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
            <label htmlFor="input_txt" className="p-component">
              Longitude
            </label>
          </span>
        </div>
        <div className="flex flex-wrap py-2 justify-content-center card-container">
          <Button
            className="flex flex-wrap py-3 justify-content-center card-container"
            type="button"
            label="Fetch Temperature"
            onClick={fetchResult}
          ></Button>
        </div>
        <div className="chart">{allData && <LineChart chartData={allData} />}</div>
      </div>
    </div>
  );
}

export default App;
