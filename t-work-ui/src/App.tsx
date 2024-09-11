import MainLayout from "./components/layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

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
