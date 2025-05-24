import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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


const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  { path: "/home", element: <Home />, errorElement: <Error /> },
  { path: "/stocks/:id", element: <CoreStock />, errorElement: <Error /> },
  { path: "/stocks", element: <Stock />, errorElement: <Error /> },
  { path: "/crypto", element: <Crypto />, errorElement: <Error /> },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "*", element: <RouteError /> },
]);


const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, x: "-100vw" }}
      animate={{ scale: 1, opacity: 1, x: "0" }}
      exit={{ scale: 0.7, opacity: 0, x: "100vw" }} 
      transition={{ duration: 0.5, ease: "power2.out" }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const isTouchScreen = window.matchMedia("(pointer: coarse)").matches;

  return (
    <div>
      {isTouchScreen ? null : <CustomCursor />}
      <ToastContainer position="top-center" autoClose={3000} />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
