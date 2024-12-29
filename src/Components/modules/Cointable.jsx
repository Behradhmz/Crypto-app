import chartup from "../../assets/chart-up.svg";
import chartdown from "../../assets/chart-down.svg";
import styles from "./Cointable.module.css";

import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../Services/cryptoApi";

function Cointable({ coins, isLoading, currency, Setischart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24hr</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                Setischart={Setischart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cointable;

const currencySign = { usd: "$", eur: "€", jpy: "¥" };

const TableRow = ({ coin, currency, Setischart }) => {
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      console.log(json);
      Setischart({ ...json, coin });
    } catch (error) {
      Setischart(null);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd"
          ? currencySign.usd
          : currency === "eur"
          ? currencySign.eur
          : currency === "jpy"
          ? currencySign.jpy
          : null}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartup : chartdown} alt={name} />
      </td>
    </tr>
  );
};
