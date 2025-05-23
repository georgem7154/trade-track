import { Glow } from "@codaworks/react-glow";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SpecificStockLive = () => {
  const { id } = useParams();
  const [close, setClose] = useState();
  const [high, setHigh] = useState();
  const [low, setLow] = useState();
  const [open, setOpen] = useState();
  const [volume, setVolume] = useState();
  const [number, setNumber] = useState();
  const [compare, setCompare] = useState([]);
  const [error, setError] = useState(false);
  const [inr, setInr] = useState(0);

  const getLiveData = async () => {
    try {
      const response = await axios.get(
        `https://trade-track-g6hr.onrender.com/api/${id}/latest`
      );
      const data = response.data;
      setClose(data.minuteBar?.c || 0);
      setHigh(data.minuteBar?.h || 0);
      setLow(data.minuteBar?.l || 0);
      setOpen(data.minuteBar?.o || 0);
      setVolume(data.minuteBar?.v || 0);
      setNumber(data.minuteBar?.n || 0);
      setCompare({
        c: data.prevDailyBar?.c || 0,
        h: data.prevDailyBar?.h || 0,
        l: data.prevDailyBar?.l || 0,
        o: data.prevDailyBar?.o || 0,
        v: data.prevDailyBar?.v || 0,
        n: data.prevDailyBar?.n || 0,
      });
    } catch (error) {
      setError(true);
    }
  };
  const getLiveUsd = async () => {
    try {
      const response = await axios.get(
        "https://trade-track-g6hr.onrender.com/api/usdtoinr"
      );
      const data = response.data;
      setInr(data.price);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getLiveData();
    getLiveUsd();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!error ? (
        <div className="grid xl:grid-cols-6 md:grid-cols-2  max-sm:grid-cols-1 gap-1  select-none  m-10">
          <Glow className="porcup" color="blue">
            <div className="relative p-4 text-slate-400">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                  OPEN
                </div>
              </div>
              {open > compare.o ? (
                <div className="text-green-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${open}&nbsp;
                      <svg className="text-green-500 w-4 h-4">
                        <path
                          d="M11.272 5.205L16.272 13.205C16.8964 14.2041 16.1782 15.5 15 15.5H5.00002C3.82186 15.5 3.1036 14.2041 3.72802 13.205L8.72802 5.205C9.31552 4.265 10.6845 4.265 11.272 5.205Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(open * inr).toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${open}&nbsp;
                      <svg className="text-red-500 w-4 h-4">
                        <path
                          d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(open * inr).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Glow>
          <Glow className="porcup" color="purple">
            <div className="relative p-4 flex-1 text-slate-400">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                  CLOSE
                </div>
              </div>
              {close > compare.c ? (
                <div className="text-green-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${open}&nbsp;
                      <svg className="text-green-500 w-4 h-4">
                        <path
                          d="M11.272 5.205L16.272 13.205C16.8964 14.2041 16.1782 15.5 15 15.5H5.00002C3.82186 15.5 3.1036 14.2041 3.72802 13.205L8.72802 5.205C9.31552 4.265 10.6845 4.265 11.272 5.205Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(close * inr).toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${close}&nbsp;
                      <svg className="text-red-500 w-4 h-4">
                        <path
                          d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(close * inr).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Glow>
          <Glow className="porcup" color="yellow">
            <div className="relative p-4 flex-1 text-slate-400">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                  HIGH
                </div>
              </div>
              {high > compare.h ? (
                <div className="text-green-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${high}&nbsp;
                      <svg className="text-green-500 w-4 h-4">
                        <path
                          d="M11.272 5.205L16.272 13.205C16.8964 14.2041 16.1782 15.5 15 15.5H5.00002C3.82186 15.5 3.1036 14.2041 3.72802 13.205L8.72802 5.205C9.31552 4.265 10.6845 4.265 11.272 5.205Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(high * inr).toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${high}&nbsp;
                      <svg className="text-red-500 w-4 h-4">
                        <path
                          d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(high * inr).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Glow>
          <Glow className="porcup" color="orange">
            <div className="relative p-4 flex-1 text-slate-400">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                  LOW
                </div>
              </div>
              {low > compare.l ? (
                <div className="text-green-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${low}&nbsp;
                      <svg className="text-green-500 w-4 h-4">
                        <path
                          d="M11.272 5.205L16.272 13.205C16.8964 14.2041 16.1782 15.5 15 15.5H5.00002C3.82186 15.5 3.1036 14.2041 3.72802 13.205L8.72802 5.205C9.31552 4.265 10.6845 4.265 11.272 5.205Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(low * inr).toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${low}&nbsp;
                      <svg className="text-red-500 w-4 h-4">
                        <path
                          d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(low * inr).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Glow>
          <Glow className="porcup" color="magenta">
            <div className="relative p-4 flex-1 text-slate-400">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                  VOLUME
                </div>
              </div>
              {volume > compare.v ? (
                <div className="text-green-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${volume}&nbsp;
                      <svg className="text-green-500 w-4 h-4">
                        <path
                          d="M11.272 5.205L16.272 13.205C16.8964 14.2041 16.1782 15.5 15 15.5H5.00002C3.82186 15.5 3.1036 14.2041 3.72802 13.205L8.72802 5.205C9.31552 4.265 10.6845 4.265 11.272 5.205Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(volume * inr).toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${volume}&nbsp;
                      <svg className="text-red-500 w-4 h-4">
                        <path
                          d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(volume * inr).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Glow>
          <Glow className="porcup" color="cyan">
            <div className="relative p-4 flex-1 text-slate-400">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-opacity-0">
                <div className=" glow:ring-glow glow:ring-2 bg-slate-900 glow:text-white justify-center px-2 py-1 rounded-full">
                  TRADES
                </div>
              </div>
              {number > compare.n ? (
                <div className="text-green-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${number}&nbsp;
                      <svg className="text-green-500 w-4 h-4">
                        <path
                          d="M11.272 5.205L16.272 13.205C16.8964 14.2041 16.1782 15.5 15 15.5H5.00002C3.82186 15.5 3.1036 14.2041 3.72802 13.205L8.72802 5.205C9.31552 4.265 10.6845 4.265 11.272 5.205Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(number * inr).toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 flex justify-center flex-row rounded-lg bg-slate-900 w-full glow:ring-glow glow:ring-2 glow:bg-glow/20 py-6 px-10 ">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      ${number}&nbsp;
                      <svg className="text-red-500 w-4 h-4">
                        <path
                          d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>RS{(number * inr).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Glow>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SpecificStockLive;
