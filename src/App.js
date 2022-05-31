import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import ConfirmContextProvider from "./lib/components/confirm/ConfirmContextProvider";

import AppRouter from "./AppRouter";

import LandingPage from "./components/landing-section/pages/LandingPage";
import LandingLayout from "./components/shared/LandingLayout";
import ConfirmPopup from "./components/shared/ConfirmPopup";

import "./styles/tailwind-output.css";

const App = () => {
  const [activeDateRange, setActiveDateRange] = useState(null);

  return (
    <ConfirmContextProvider>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <LandingLayout>
              <LandingPage />
            </LandingLayout>
          }
        />
        <Route
          path="/app/*"
          element={
            <AppRouter
              activeDateRange={activeDateRange}
              setActiveDateRange={setActiveDateRange}
            />
          }
        />
      </Routes>
      <ConfirmPopup />
    </ConfirmContextProvider>
  );
};

export default App;
