import React from "react";
import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Home = () => {
  const { id } = useParams();

  return (
    <div className="select-none">
      <Hero/>
    </div>
  );
};

export default Home;