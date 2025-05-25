import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Error,
  Home,
  Register,
  Login,
  RouteError,
  CoreStock,
  Stock,
  Crypto,
} from "../../client/src/pages/Index";
import CustomCursor from "./CustomCursor";
import Authentication from "./pages/Auth/Authentication";
import PageTransition from "./PageTransition";
import Ribbon from "./pages/Home/Ribbon";

const App = () => {
  const location = useLocation();
  const isTouchScreen = window.matchMedia("(pointer: coarse)").matches;
  const [authChecker,setAuthChecker] = useState(false)
  return (
<>
      {isTouchScreen ? null : <CustomCursor />}
      <ToastContainer position="top-center" autoClose={3000} />
      <Ribbon authChecker={authChecker} setAuthChecker={setAuthChecker}/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}> 
          <Route path="/" element={<PageTransition><Home authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>}/>
          <Route path="/stocks/:id" element={<PageTransition><CoreStock authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>} />
          <Route path="/stocks" element={<PageTransition><Stock authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>} />
          <Route path="/crypto" element={<PageTransition><Crypto authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Authentication authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>}>
            <Route path="login" element={<PageTransition><Login authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>} />
            <Route path="register" element={<PageTransition><Register authChecker={authChecker} setAuthChecker={setAuthChecker}/></PageTransition>} />
          </Route>
          <Route path="*" element={<RouteError />} />
        </Routes>
      </AnimatePresence>
 </>
  );
};

export default App;