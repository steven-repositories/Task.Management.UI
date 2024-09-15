"use client";

import MainLayout from "./components/layouts/main-layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./pages/main";

const App = () => {
  const navigate = useNavigate();

  return (
      <MainLayout navigate={navigate}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MainLayout>
  );
};

export default App
