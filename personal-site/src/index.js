import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ComingSoon from "./components/ComingSoon";
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
