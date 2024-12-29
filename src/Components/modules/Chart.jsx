import { useState } from "react";
import { convertData } from "../../helper/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./Chart.module.css";

function Chart({ chart, Setischart }) {
  console.log(chart);
  const [type, setType] = useState("prices");

  // const typeHandler = (event) => {
  //   if (event.target.tagName === "BUTTON") {
  //     const type = event.target.innerText.toLowerCase().replace(" ", "_");
  //     setType(type);
  //   }
  // };

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => Setischart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types}>
          <button
            className={type === "prices" ? styles.selected : null}
            onClick={() => setType("prices")}
          >
            Prices
          </button>
          <button
            className={type === "market_caps" ? styles.selected : null}
            onClick={() => setType("market_caps")}
          >
            Market Caps
          </button>
          <button
            className={type === "total_volumes" ? styles.selected : null}
            onClick={() => setType("total_volumes")}
          >
            Total Volums
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>${chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type={"monotoneX"}
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="data" hide />
        <Legend />
        <Tooltip offset={5} />
      </LineChart>
    </ResponsiveContainer>
  );
};
