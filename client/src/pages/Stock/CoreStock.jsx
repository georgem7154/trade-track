import { useEffect, useState } from "react";
import SpecificStockInfo from "./SpecificStockInfo.jsx";
import SpecificStockPremium from "./SpecificStockPremium.jsx";
import SpecifiStockChart from "./SpecifiStockChart.jsx";
import { GlowCapture } from "@codaworks/react-glow";
import axios from "axios";
import { Link } from "react-router-dom";
import Ribbon from "../Home/Ribbon.jsx";

const CoreStock = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const validateUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/verifytoken/user",
        { withCredentials: true }
      );
      if (response.status == 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false); //
    }
  };
  useEffect(() => {
    validateUser();
  }, []);
  return (
    <>
      <GlowCapture>
        <Ribbon />
        <SpecificStockInfo />
        <SpecifiStockChart />
        {isAuthenticated ? (
          <SpecificStockPremium />
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <div className="text-xl p-10 m-10">
                Login to access:{" "}
                <Link
                  className="hover:text-slate-200 cur3 font-bold bg-green-600 p-1 rounded-md"
                  to="/auth/login"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        )}
      </GlowCapture>
    </>
  );
};

export default CoreStock;
