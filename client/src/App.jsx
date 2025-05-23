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
  { path: "/stocks/:id", element: <CoreStock /> , errorElement: <Error /> },
  { path: "/stocks", element: <Stock /> , errorElement: <Error /> },
  { path: "/crypto", element: <Crypto /> , errorElement: <Error /> },
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

// import React from "react";
// import { createBrowserRouter, RouterProvider} from "react-router-dom";
// import {Error,Home,Stock,Signin,Signup,Login, Authentication, RouteError} from './pages'
// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>,
//     errorElement:<Error/>
//   },
//   {
//     path:'/home',
//     element:<Home/>,
//     errorElement:<Error/>
//   },
//   {
//     path:'/stocks',
//     element:<Stock/>
//   },
//   {
//     path:'/Auth',
//     element:<Authentication/>,
//     children:[
//       {
//         path:'login',
//         element:<Login/>
//       },
//       {
//         path:'signup',
//         element:<Signup/>
//       },
//       {
//         path:'signin',
//         element:<Signin/>
//       },
//     ]
//   },
//   // {
//   //   path:'/stocks/:symbol',
//   //   element:
//   // },
//   // {
//   //   path:'/stocks/:symbol/macd',
//   //   element:
//   // },
//   // {
//   //   path:'/stocks/:symbol/rsi',
//   //   element:
//   // },
//   // {
//   //   path:'/stocks/:symbol/moving-average',
//   //   element:
//   // },
//   // {
//   //   path:'/stocks/:symbol/earnings',
//   //   element:
//   // },
//   // {
//   //   path:'/stocks/:symbol/balance-sheet',
//   //   element:
//   // },
//   // {
//   //   path:'/stocks/:symbol/fundamentals',
//   //   element:
//   // },
//   // {
//   //   path:'/market',
//   //   element:
//   // },
//   // {
//   //   path:'/market/:index',
//   //   element:
//   // },
//   // {
//   //   path:'/crypto',
//   //   element:
//   // },
//   // {
//   //   path:'/crypto/:symbol',
//   //   element:
//   // },
//   // {
//   //   path:'/commodities',
//   //   element:
//   // },
//   // {
//   //   path:'/commodities/:symbol',
//   //   element:
//   // },
//   // {
//   //   path:'/economic',
//   //   element:
//   // },
//   // {
//   //   path:'/economic/gdp',
//   //   element:
//   // },
//   // {
//   //   path:'/economic/inflation',
//   //   element:
//   // },
//   // {
//   //   path:'/economic/:indicator',
//   //   element:
//   // },
//   {
//     path:'*',
//     element:<RouteError/>,
//   }
// ])
// const App = () => {
//   return (
//    <div>
//     <RouterProvider router={router}/>
//    </div>
//   );
// };

// export default App;
