import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import AddNews from "../pages/addNews";
import DashboardPage from "../pages/dashBoard/index.jsx";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/admin/:id" element={<DashboardPage />} />
      <Route path="/admin/:id/addNews" element={<AddNews />} />
    </Routes>
  );
};

export default Router;
