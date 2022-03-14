import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/landing-section/pages/LandingPage";
import LandingLayout from "./components/landing-section/shared/LandingLayout";

import "./styles/tailwind-output.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingLayout>
              <LandingPage />
            </LandingLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
