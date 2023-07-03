import "./App.css";
import Chart from "./chart";
import { Routes, Route } from "react-router-dom";
import Base from "./base";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Base />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default Index;
