import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/landing-section/pages/LandingPage";
import AppPage from "./components/app/pages/AppPage";
import LandingLayout from "./components/shared/LandingLayout";
import AppLayout from "./components/shared/AppLayout";

import "./styles/tailwind-output.css";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <LandingPage />
          </LandingLayout>
        }
      />
      <Route
        path="/app"
        element={
          <AppLayout>
            <AppPage />
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
