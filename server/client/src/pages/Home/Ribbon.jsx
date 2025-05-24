import { Glow, GlowCapture } from "@codaworks/react-glow";
import focusIcon from "../../assets/focus.ico";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Ribbon = () => {
  const [symbol, setSymbol] = useState("🔽");
  const [show, setShow] = useState(false);
  return (
    <div className="absolute bg-opacity-0 top-0 left-0 w-full h-14 font-dyna z-20">
      <div className="relative bg-opacity-0 w-full h-14">
        <div className="flex max-md:hidden justify-between text-center items-center flex-row absolute z-0 top-0 h-14 w-full">
          <Link className="ml-10 h-full  w-fit" to="/">
            <img className="h-full cur3 w-auto" src={focusIcon} />
          </Link>
          <div className="mr-20 px-14 flex justify-end text-black">
            <Link to="/stocks">
              <button className="herobutton cur3">Stocks</button>
            </Link>
            <Link to="/crypto">
              <button className="herobutton cur3">Crypto</button>
            </Link>
          </div>
          <div className=" text-black">
            <Link to="/auth/register">
              <button className="herobutton cur3">Register</button>
            </Link>
          </div>
        </div>
        <div className="flex md:hidden justify-between text-center items-center flex-row absolute z-0 top-0 h-14 w-full">
          <Link className="ml-10 h-full  w-fit" to="/">
            <img className="h-full cur3 w-auto" src={focusIcon} />
          </Link>
          <div className="px-4 text-4xl text-black">
            <button onClick={() => (show ? setShow(false) : setShow(true))}>
              {symbol}
            </button>
          </div>
        </div>
        {show ? (
          <div className="absolute flex flex-col justify-center text-white top-14 right-0 w-40 bg-black bg-opacity-90">
            <Link className="flex my-2 justify-center cur3" to="/stocks">
              <button className="cur3">Stocks</button>
            </Link>
            <Link className="flex my-2 justify-center cur3" to="">
              <button className=" cur3">Crypto</button>
            </Link>
            <Link className="flex my-2 justify-center cur3" to="/auth/register">
              <button className=" cur3">Register</button>
            </Link>
            <div></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Ribbon;
