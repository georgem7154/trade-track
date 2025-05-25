import React from "react";
import Ribbon from "./Ribbon";

const Hero = ({authChecker,setAuthChecker}) => {
  return (
    <div className="w-screen relative rounded-lg overflow-hidden flex min-h-screen justify-center items-center">
      <video
        className="absolute w-full h-full z-0 top-0 left-0 rounded-sm object-cover"
        autoPlay
        muted
        loop
      >
        <source src="hero.mp4" type="video/mp4" />
      </video>
      <div className="bg-black z-10 opacity-20 absolute top-0 left-0 w-full h-full"></div>
     {/* <Ribbon authChecker={authChecker} setAuthChecker={setAuthChecker}/> */}
     <div className="absolute top-40 font-mystery w-full max-sm:text-8xl max-sm:text-center max-sm:ml-0 text-white shadow-md ml-20 text-9xl z-10">
            <div className="bg-black w-fit p-5 rounded-xl bg-opacity-5">
              <div>Trade</div>
              <div className="pl-20">Track</div>
            </div>
          </div>
    </div>
  );
};

export default Hero;
