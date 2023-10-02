import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import DashBoard from "../pages/dashBoard";
import AddNews from "../pages/addNews";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/admin/:id" element={<DashBoard />} />
      <Route path="/admin/:id/addNews" element={<AddNews />} />
    </Routes>
  );
};

export default Router;
