import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./lib/auth/ProtectedRoute";
import ConfirmContextProvider from "./lib/components/confirm/ConfirmContextProvider";

import LandingPage from "./components/landing-section/pages/LandingPage";
import AppPage from "./components/app/AppPage";
import LandingLayout from "./components/shared/LandingLayout";
import ConfirmPopup from "./components/shared/ConfirmPopup";

import "./styles/tailwind-output.css";

const App = () => {
  return (
    <ConfirmContextProvider>
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
      <ConfirmPopup />
    </ConfirmContextProvider>
  );
};

export default App;
