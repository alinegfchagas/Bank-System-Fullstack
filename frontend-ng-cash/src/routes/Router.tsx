import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage"
import ErroPage from "../pages/ErrorPage";

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={<HomePage  />}
      />
      <Route
        path="/cadastro"
        element={<SignUpPage  />}
      />
    <Route path="/login " element={<LoginPage/>}/>
    
      {/* <Route path="*" element={<ErroPage />} /> */}
    </Routes>
  );
};

export default Router;