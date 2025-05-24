import { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { Glow } from "@codaworks/react-glow";
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const SpecifiStockPremium = () => {
  const { id } = useParams();
  const [time, setTime] = useState([]);
  const [open, setOpen] = useState([]);
  const [close, setClose] = useState([]);
  const [high, setHigh] = useState([]);
  const [low, setLow] = useState([]);
  const [error, setError] = useState(false);
  const [loadchart, setLoadchart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [value] = useDebounce(year, 1000);
  const [yearError, setYearError] = useState(false);
  const [usdinr, setUsdinr] = useState([]);
  let start = "";
  let end = "";
  const getChartData = async (value = 2025) => {
    try {
      if (!value) {
        value = new Date().getFullYear();
      }
      if (value == new Date().getFullYear()) {
        start = `${value}-01-01`;
        end = new Date(Date.now() - 24 * 60 * 60 * 1000)
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
        `/api/${id.toUpperCase()}/datapremium`,
        {
          params: { start: start, end: end },
        }
      );

      const extract = response.data.bars[id.toUpperCase()];
      setOpen(extract.map((data) => data.o || 0));
      setClose(extract.map((data) => data.c || 0));
      setHigh(extract.map((data) => data.h || 0));
      setLow(extract.map((data) => data.l || 0));
      setTime(extract.map((data) => data.t.split("T")[0] || 0));
      setLoadchart(loadchart ? false : true);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  useEffect(() => {
    getChartData(value);
    if (value < 2025) {
      getUsdHistory(value);
    }
    setError(false);
  }, [value]);

  const getUsdHistory = async (value = 2025) => {
    try {
      const response = await axios.get(
        `/api/${value}/inr`
      );
      const data = response.data;
      setUsdinr(data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const getChart = async () => {
    const matchingPrices = time.map((date) => {
      const found = usdinr.find(
        (stock) => new Date(stock.Date).getTime() === new Date(date).getTime()
      );
      return found ? found.Price : "";
    });
    const datapoint = time.map((time, index) => ({
      x: new Date(time),
      y: [open[index], high[index], low[index], close[index]],
      t: matchingPrices[index],
    }));
    const datapointnav = time.map((time, index) => ({
      x: new Date(time),
      y: open[index],
    }));
    const options = {
      animationEnabled: true,
      zoomEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: { text: `${id} StockChart` },
      subtitles: [{ text: "Advanced Processing" }],
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
          toolTip: {
            shared: true,
            contentFormatter: function (e) {
              const dataPoint = e.entries[0].dataPoint; // Get the hovered data point
              return `🟢 Open: ${dataPoint.y[0]} ${
                dataPoint.t
                  ? `| Rs${(dataPoint.t * dataPoint.y[0]).toFixed(2)}`
                  : ""
              } <br>
            🔺 High: ${dataPoint.y[1]} ${
                dataPoint.t
                  ? `| Rs${(dataPoint.t * dataPoint.y[1]).toFixed(2)}`
                  : ""
              } <br>
            🔻 Low: ${dataPoint.y[2]} ${
                dataPoint.t
                  ? `| Rs${(dataPoint.t * dataPoint.y[2]).toFixed(2)}`
                  : ""
              } <br>
            🔴 Close: ${dataPoint.y[3]} ${
                dataPoint.t
                  ? `| Rs${(dataPoint.t * dataPoint.y[3]).toFixed(2)}`
                  : ""
              } <br>`;
            },
          },
          data: [
            {
              name: "Price (in USD)",
              yValueFormatString: "$#,###.##",
              type: "candlestick",
              dataPoints: datapoint,
            },
          ],
        },
      ],
      navigator: {
        data: [{ dataPoints: datapointnav }],
        slider: {},
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
    <div className="mb-10">
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
        <div className=" mx-5">
          <div className="gap-8  mt-5 flex flex-row ">
            <div className="text-xl font-sans text-slate-400">choose year:</div>

            <Glow color="red">
              <input
                type="text"
                className="w-40 cur2 bg-black text-center bighero glow:border-glow glow:ring-glow glow:bg-glow/15 rounded-lg border-red-50 border-2 font-bold  text-xl text-green-500"
                onChange={(e) => {
                  setYear(Number(e.target.value));
                }}
              />
              <div className="text-center select-none">INR Till 2024 Only</div>
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
    </div>
  );
};

export default SpecifiStockPremium;

// left
//crypto route and data
//crypto chart
// advance graph
// stock and crypto - historical and latest bars
// screenrer most active and top movers for stock and crypto
//  news
//ribbon for all rotes
