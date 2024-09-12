"use client";

import MainLayout from "./components/layouts/main-layout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";

const App = () => {
  return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MainLayout>
  );
};

export default App
