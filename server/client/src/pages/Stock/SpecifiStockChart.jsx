import { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { Glow } from "@codaworks/react-glow";
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const SpecifiStockChart = () => {
  const { id } = useParams();
  const [time, setTime] = useState([]);
  const [price, setPrice] = useState([]);
  const [size, setSize] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [error, setError] = useState(false);
  const [loadchart, setLoadchart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [value] = useDebounce(year, 1000);
  const [yearError, setYearError] = useState(false);
  let start = "";
  let end = "";
  const getChartData = async (value = 2025) => {
    try {
      if (value == new Date().getFullYear()) {
        start = `${value}-01-01`;
        end = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
      } else if (value > new Date().getFullYear()) {
        setYearError(true);
        setTimeout(() => setYearError(false), 2000);
        return;
      } else {
        start = `${value}-01-01`;
        end = `${Number(value) + 1}-01-01`;
      }
      // debugger
      const response = await axios.get(
        `/api/${id.toUpperCase()}/data`,
        {
          params: { start: start, end: end },
        }
      );

      const extract = response.data.auctions[id.toUpperCase()];
      if (!extract) setError(true);
      const filteredData = extract.filter((data) => data.c && data.c[0]);
      setTime(filteredData.map((data) => data.c?.[0].t.split(".")[0] || ""));
      setExchange(filteredData.map((data) => data.c?.[0].x || ""));
      setPrice(filteredData.map((data) => data.c?.[0].p || 0));
      setSize(filteredData.map((data) => data.c?.[0].s || 0));

      setLoadchart(loadchart ? false : true);
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
      setError(true);
    }
  };
  useEffect(() => {
    getChartData(value);
    setError(false);
  }, [value]);

  const getChart = async () => {
    const datapoint = time.map((time, index) => ({
      x: new Date(time),
      y: price[index],
      exchange: exchange[index],
      size: size[index],
    }));
    const options = {
      animationEnabled: true,
      zoomEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: { text: `${id} StockChart` },
      subtitles: [{ text: "Basic Processing" }],
      charts: [
        {
          axisX: {
            lineThickness: 5,
            tickLength: 0,
            labelFormatter: () => "",
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              labelFormatter: () => "",
            },
          },
          axisY: { title: "Stock Price", prefix: "$", tickLength: 0 },
          toolTip: { shared: true },
          data: [
            {
              name: "Price (in USD)",
              yValueFormatString: "$#,###.##",
              type: "line",
              dataPoints: datapoint,
            },
          ],
        },
      ],
      navigator: {
        data: [{ dataPoints: datapoint }],
        slider: {
          //   minimum: new Date("2022-06-03"),
          //   maximum: new Date("2022-06-04"),
        },
      },
    };
    setOptions(options);
    setLoading(false);
  };
  useEffect(() => {
    getChart();
  }, [loadchart]);

  const containerProps = { width: "100%", height: "450px", margin: "auto" };

  return (
    <div className="">
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
        </div>
      ) : (
        <div className="mt-5 mx-5">
          <div className="text-3xl max-sm:text-base text-green-500 font-press">
            Stock Chart (from 2015):
          </div>

          <div className="gap-8  mt-5 flex flex-row ">
            <div className="text-xl font-sans text-slate-400">choose year:</div>

            <Glow color="red">
              <input
                type="text"
                className="w-40 cur2 bg-black text-center glow:border-glow glow:ring-glow glow:bg-glow/15 rounded-lg border-red-50 border-2 font-bold  text-xl text-green-500"
                onChange={(e) => {
                  setYear(Number(e.target.value));
                }}
              />
            </Glow>
            {yearError ? (
              <div className="text-red-500 font-mono text-xl">invalid year</div>
            ) : (
              ""
            )}
          </div>
          {error ? (
            <div className="justify-center mt-5 items-center flex flex-col ">
              <div className="font-press ">Sorry an Error Occoured</div>
              <div className="font-press ">Couldn't retrieve data</div>
              <div className="font-mono">
                {error.toString() == "true"
                  ? "no data available/invalid date"
                  : error.toString()}
              </div>
            </div>
          ) : (
            <div className="mt-5 mx-5">
              <CanvasJSStockChart
                containerProps={containerProps}
                options={options}
              />
            </div>
          )}
        </div>
      )}
      <div className="text-3xl mt-5 max-sm:text-sm text-blue-500 font-press">
        Advanced Stock Chart (from 2015):
      </div>
    </div>
  );
};

export default SpecifiStockChart;
