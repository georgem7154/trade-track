import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import { Glow } from "@codaworks/react-glow";
import SpecificStockLive from "./SpecificStockLive";
import ImageNotFound from "../../assets/image.png";

const SpecificStockInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [icon, setIcon] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [homepage, setHomepage] = useState("");
  const [listdate, setListDate] = useState("");
  const [locale, setLocale] = useState("");
  const [market, setMarket] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [primaryexchange, setPrimaryexchange] = useState("");
  const [sicdescription, setSicDescription] = useState("");
  const [ticker, setTicker] = useState("");
  const getIcon = async (link, retry = 1) => {
    if (!icon) {
      setLoading(false);
      return;
    }
    let attempt = 0;
    while (attempt < retry) {
      try {
        const response = await axios.get(
          "https://trade-track-g6hr.onrender.com/api/icon",
          {
            params: { link },
            responseType: "blob",
          }
        );
        const imageurl = URL.createObjectURL(response.data);
        setIcon(imageurl);
        setLoading(false);
        return;
      } catch (error) {
        attempt++;
        console.error("Error fetching image:", error);

        if (attempt < retry) {
          console.log("retrying image");
          await new Promise((resolve) => setTimeout(resolve, 5000));
        } else {
          setError(`Couldnt retrieve image.Please reload`);
          return;
        }
      }
    }
  };
  const getStock = async (retry = 5) => {
    let attempt = 0;
    while (attempt < retry) {
      try {
        const response = await axios.get(
          `https://trade-track-g6hr.onrender.com/api/${id.toUpperCase()}/company`
        );
        console.log(response.data);
        setAddress(
          `${response.data.results.address?.address1 || ""} ${
            response.data.results.address?.city || ""
          } ${response.data.results.address?.state || ""} ${
            response.data.results.address?.postal_code || ""
          }`
        );
        setIcon(response.data.results.branding?.icon_url || "");
        setCurrency(response.data.results?.currency_name || "");
        setDescription(response.data.results?.description || "");
        setHomepage(response.data.results?.homepage_url || "");
        setListDate(response.data.results?.list_date || "");
        setLocale(response.data.results?.locale || "");
        setMarket(response.data.results?.market || "");
        setName(response.data.results?.name || "");
        setPhone(response.data.results?.phone_number || "");
        setPrimaryexchange(response.data.results?.primary_exchange || "");
        setSicDescription(response.data.results?.sic_description || "");
        setTicker(response.data.results?.ticker || "");
        if (!icon) {
          setLoading(false);
        }
        return;
      } catch (error) {
        attempt++;
        if (attempt < retry) {
          if (error.response.data.error == "Ticker not found.") {
            setError(`${error.response.data.error.toString()}.Please reload`);
            return;
          }
          console.log("retrying data");
          await new Promise((resolve) => setTimeout(resolve, 5000));
        } else {
          console.log(error.response.data.error);
          setError(`${error.response.data.error.toString()}`);
          return;
        }
      }
    }
  };
  useEffect(() => {
    getStock();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (icon && icon.startsWith("http")) {
      getIcon(icon);
    }
    window.scrollTo(0, 0);
  }, [icon]);

  if (error) {
    if (error == "Ticker not found.") {
      return (
        <div>
          <div className="text-3xl font-press text-red-400 text-center mt-5">
            {id}
          </div>

          <TypeAnimation
            sequence={[
              "Couldn't load info on this stock",
              500,
              "Stock info not available",
              100,
            ]}
            wrapper="span"
            speed={50}
            className="text-xl transition ease-in-out flex justify-center font-bold"
          />
          <div>
            <SpecificStockLive />
          </div>
        </div>
      );
    }
    return (
      <div className="justify-center items-center flex flex-col w-full min-h-screen">
        <div className="font-press ">Sorry an Error Occoured</div>
        <div className="font-press ">Couldn't retrieve data</div>
        <div className="font-mono">{error.toString()}</div>
        <div>
          <SpecificStockLive />
        </div>
      </div>
    );
  }
  return (
    <>
      {loading ? (
        <div className=" h-screen flex-col flex justify-center items-center">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <span className="font-press">Loading</span>
          <span className="font-press">Delay due to Rate Limit</span>
        </div>
      ) : (
        <div className="overflow-x-hidden select-none flex">
          <div className="mt-20">
            <div className="flex flex-row gap-1 grid-cols-12 overflow-hidden break-words ">
              <img
                className="w-20  h-20 flex justify-center  items-center mx-10"
                src={icon || ImageNotFound}
                alt="N/A"
              />
              <div className="col-span-1"></div>
              <div className="col-span-10 flex-wrap justify-center  break-words  font-press text-2xl items-center flex">
                {name}({ticker})
              </div>
              <div></div>
            </div>
            <div>
              <SpecificStockLive />
            </div>
            <div className="mt-5 grid grid-cols-2 font-mono text-slate-400">
              <div className="col-span-1 m-2 ml-5 ">
                <div>
                  <span className="text-green-400 font-bold">DESCRIPTION</span>:{" "}
                  {description}
                </div>
                <div className="mt-10">
                  <span className="text-green-400 font-bold">INDUSTRY</span>:{" "}
                  {sicdescription}
                </div>
              </div>
              <div className="col-span-1 grid grid-row-9 gap-3  ml-5">
                <div>
                  <span className="text-green-400 font-bold">LISTDATE</span>:{" "}
                  {listdate}
                </div>
                <div>
                  <span className="text-green-400 font-bold">ADDRESS</span>:{" "}
                  {address}
                </div>
                <div>
                  <span className="text-green-400 font-bold">CURRENCY</span>:{" "}
                  {currency}
                </div>
                <div>
                  <span className="text-green-400 font-bold">WEBSITE</span>:{" "}
                  <a
                    className="hover:text-blue-500"
                    target="_blank"
                    href={homepage}
                  >
                    {homepage}
                  </a>
                </div>
                <div>
                  <span className="text-green-400 font-bold">LOCALE</span>:{" "}
                  {locale}
                </div>
                <div>
                  <span className="text-green-400 font-bold">MARKET</span>:{" "}
                  {market}
                </div>
                <div>
                  <span className="text-green-400 font-bold">PHONE</span>:{" "}
                  {phone}
                </div>
                <div>
                  <span className="text-green-400 font-bold">
                    PRIMARY EXCHANGE
                  </span>
                  : {primaryexchange}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SpecificStockInfo;
