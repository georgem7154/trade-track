import React, { useEffect, useState } from "react";
import Ribbon from "../Home/Ribbon.jsx";
import { Glow, GlowCapture } from "@codaworks/react-glow";
import axios from "axios";
import { Link } from "react-router-dom";
import { DNA } from "react-loader-spinner";

const Crypto = () => {
  const [symbol1, setSymbol1] = useState([]);
  const [tradeCount1, setTradeCount1] = useState([]);
  const [volume1, setVolume1] = useState([]);
  const [error1, setError1] = useState("");

  const [color, setColor] = useState([
    "Red",
    "Blue",
    "Green",
    "Purple",
    "Pink",
    "Yellow",
    "Orange",
    "Cyan",
  ]);
  const [loading, setLoading] = useState(true);

   const getTopStocks = async () => {
    try {
      const response = await axios.get("https://trade-track-g6hr.onrender.com/api/ctopmovers");
      const extract = response.data.gainers;
      console.log(response.data)
      setSymbol1(extract.map((data) => data.symbol));
      setTradeCount1(extract.map((data) => data.price));
      setVolume1(extract.map((data) => data.percent_change));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError1(error.response.data.message.toString());
    }
  };
  useEffect(() => {
    getTopStocks();
  }, []);
  return (
    <div>
      <Ribbon />
      <GlowCapture>
        <div className="m-20">
         
          <div className="text-3xl font-press">Top Market Movers</div>
          {loading ? (
            <div className="flex justify-center m-10 p-10">
              <DNA
                visible={true}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : error1 ? (
            <div>error: {error1}</div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0">
              {symbol1.map((data, i) => (
                <Link to={`/stocks/${data}`}>
                  <Glow color={color[i % 8]} className="grid">
                    <div className="relative p-4 text-slate-400">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                        <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                          {data}
                        </div>
                      </div>
                      <div className="py-4 px-8  glow:ring-2 flex-col text-center glow:ring-glow rounded-xl bg-slate-900 flex">
                        <div>Price: {tradeCount1[i]}</div>
                        <div>Percent Change: {Number(volume1[i]).toFixed(1)}%</div>
                      </div>
                    </div>
                  </Glow>
                </Link>
              ))}
            </div>
          )}
        </div>
      </GlowCapture>
    </div>
  );
};

export default Crypto;
