"use client";

import MainLayout from "./components/layouts/main-layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login";

const App = () => {
  const navigate = useNavigate();

  return (
      <MainLayout navigate={navigate}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MainLayout>
  );
};

export default App
