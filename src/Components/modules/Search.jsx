import { useEffect, useState } from "react";
import { searchCoin } from "../Services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Search.module.css";
import Chart from "./Chart";

function Search({ currency, Setcurrency, chart }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setIsloading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);

        if (json.coins) {
          setIsloading(false);
          setCoins(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.massage);
        }
      }
    };
    setIsloading(true);
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => Setcurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isloading) && (
        <div className={styles.searchResult}>
          <ul>
            {isloading && (
              <RotatingLines
                width="50px"
                height="50px"
                strokeWidth="2"
                strokeColor="#3874ff"
              />
            )}
            {coins.map((coin) => ( 
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
