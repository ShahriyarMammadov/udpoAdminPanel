import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import AddNews from "../pages/addNews";
// import DashBoardPage from "../pages/dashBoard";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      {/* <Route path="/admin/:id" element={<DashBoardPage />} /> */}
      <Route path="/admin/:id/addNews" element={<AddNews />} />
    </Routes>
  );
};

export default Router;
