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

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [allData, setAllData] = useState([]);

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

  // Chart
  const LineChart = () => {
    // TODO:  Need to figure out implementation of this unused Loop.
    let timeOfDay = allData.properties.timeseries;
    let i = 0;
    while (i < timeOfDay.length) {
      i++;
    }
    const [basicData] = useState({
      labels: [
        allData.properties.timeseries[3].time,
        allData.properties.timeseries[6].time,
        allData.properties.timeseries[9].time,
        allData.properties.timeseries[12].time,
        allData.properties.timeseries[15].time,
        allData.properties.timeseries[18].time,
        allData.properties.timeseries[21].time,
        allData.properties.timeseries[24].time,
        allData.properties.timeseries[27].time,
        allData.properties.timeseries[30].time,
        allData.properties.timeseries[33].time,
        allData.properties.timeseries[36].time,
        allData.properties.timeseries[39].time,
        allData.properties.timeseries[42].time,
        allData.properties.timeseries[45].time,
        allData.properties.timeseries[48].time,
        allData.properties.timeseries[51].time,
        allData.properties.timeseries[54].time,
        allData.properties.timeseries[57].time,
        allData.properties.timeseries[60].time,
      ],
      datasets: [
        {
          label: "Temperature",
          data: [
            allData.properties.timeseries[0].data.instant.details
              .air_temperature,
            allData.properties.timeseries[3].data.instant.details
              .air_temperature,
            allData.properties.timeseries[6].data.instant.details
              .air_temperature,
            allData.properties.timeseries[9].data.instant.details
              .air_temperature,
            allData.properties.timeseries[12].data.instant.details
              .air_temperature,
            allData.properties.timeseries[15].data.instant.details
              .air_temperature,
            allData.properties.timeseries[18].data.instant.details
              .air_temperature,
            allData.properties.timeseries[21].data.instant.details
              .air_temperature,
            allData.properties.timeseries[24].data.instant.details
              .air_temperature,
            allData.properties.timeseries[27].data.instant.details
              .air_temperature,
            allData.properties.timeseries[30].data.instant.details
              .air_temperature,
            allData.properties.timeseries[33].data.instant.details
              .air_temperature,
            allData.properties.timeseries[36].data.instant.details
              .air_temperature,
            allData.properties.timeseries[39].data.instant.details
              .air_temperature,
            allData.properties.timeseries[42].data.instant.details
              .air_temperature,
            allData.properties.timeseries[45].data.instant.details
              .air_temperature,
            allData.properties.timeseries[48].data.instant.details
              .air_temperature,
            allData.properties.timeseries[51].data.instant.details
              .air_temperature,
            allData.properties.timeseries[54].data.instant.details
              .air_temperature,
            allData.properties.timeseries[57].data.instant.details
              .air_temperature,
            allData.properties.timeseries[60].data.instant.details
              .air_temperature,
          ],
          fill: false,
          borderColor: "#42A5F5",
          tension: 0.4,
        },
      ],
    });

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
          <Chart type="line" data={basicData} options={basicOptions} />
        </div>
      </div>
    );
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
        <div className="chart">
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default App;
