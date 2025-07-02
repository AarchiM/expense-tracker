import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  const Authtoken = localStorage.getItem("Authtoken");
  return (
    <div className="text-gray-600 dark:bg-[var(--primary_dark)] min-h-screen bg-[var(--creambg)] dark:text-gray-300">
      <Navbar />
      {/* <Outlet/> */}
      {Authtoken ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
}

export default App;
