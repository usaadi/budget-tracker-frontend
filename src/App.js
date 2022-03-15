import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/landing-section/pages/LandingPage";
import AppPage from "./components/app/pages/AppPage";
import MainLayout from "./components/shared/MainLayout";

import "./styles/tailwind-output.css";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />
      <Route
        path="/app"
        element={
          <MainLayout>
            <AppPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
