import logo from "./logo.svg";
import "./App.css";
import { data } from "../src/constants/constant";
import { useEffect, useState } from "react";

function App() {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    let combinedData = [];

    for (let i = 0; i < data.length; i++) {
      let bucket = data[i].bucket;
      let emission =
        (data[i].emissions ? data[i].emissions : 0) +
        (data[i].transportEmissions ? data[i].transportEmissions : 0);

      let existingObject = combinedData.find((obj) => obj.bucket === bucket);

      if (existingObject) {
        existingObject.emissions += emission;
      } else {
        combinedData.push({ ...data[i], emissions: emission });
      }
    }
    setFormattedData(combinedData);
  }, []);
  return (
    <div className="App">
      <table className="data-table">
        <thead>
          <tr>
            <th>Bucket</th>
            <th>Emissions</th>
            <th>Metric</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((item, index) => (
            <tr key={index}>
              <td>{item.bucket}</td>
              <td>{item.emissions}</td>
              <td>{item.metric}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
