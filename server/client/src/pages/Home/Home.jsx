import React from "react";
import Hero from "./Hero";
import PageTransition from "../../PageTransition";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Home = ({authChecker,setAuthChecker}) => {
  const { id } = useParams();

  return (
    <div className="select-none">
      <Hero authChecker={authChecker} setAuthChecker={setAuthChecker}/>
    </div>
  );
};

export default Home;