import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./lib/auth/ProtectedRoute";

import LandingPage from "./components/landing-section/pages/LandingPage";
import AppPage from "./components/app/AppPage";
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
      <Route path="/app" element={<ProtectedRoute component={AppPage} />} />
    </Routes>
  );
};

export default App;
