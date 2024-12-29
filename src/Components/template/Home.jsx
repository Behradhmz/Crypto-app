import { useEffect } from "react";
import { useState } from "react";
import { getCoinApi } from "../Services/cryptoApi";

import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Cointable from "../modules/Cointable";
import Chart from "../modules/Chart";

function Home() {
  const [coins, Setcoin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, Setcurrency] = useState("usd");
  const [chart, Setischart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinApi(page, currency));
        const json = await res.json();
        Setcoin(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} Setcurrency={Setcurrency} />
      <Cointable
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        Setischart={Setischart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} Setischart={Setischart} />}
    </div>
  );
}

export default Home;
