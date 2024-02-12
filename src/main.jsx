// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  // BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";

const router = createBrowserRouter(createRoutesFromElements(App()));

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    {/* <React.StrictMode> */}
    {/* <BrowserRouter> */}
    {/* <App /> */}
    {/* </BrowserRouter> */}
    {/* </React.StrictMode> */}
    <RouterProvider router={router}  />
  </GlobalContextProvider>
);
