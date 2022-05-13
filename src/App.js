import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./lib/auth/ProtectedRoute";
import ConfirmContextProvider from "./lib/components/confirm/ConfirmContextProvider";

import LandingPage from "./components/landing-section/pages/LandingPage";
import LandingLayout from "./components/shared/LandingLayout";

import SummaryPage from "./components/app/pages/SummaryPage";
import ExpensesPage from "./components/app/pages/ExpensesPage";
import IncomePage from "./components/app/pages/IncomePage";
import CategoriesPage from "./components/app/pages/CategoriesPage";

import ConfirmPopup from "./components/shared/ConfirmPopup";

import "./styles/tailwind-output.css";

const App = () => {
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
          path="/app/summary"
          element={<ProtectedRoute component={SummaryPage} />}
        />
        <Route
          path="/app/expenses"
          element={<ProtectedRoute component={ExpensesPage} />}
        />
        <Route
          path="/app/income"
          element={<ProtectedRoute component={IncomePage} />}
        />
        <Route
          path="/app/categories"
          element={<ProtectedRoute component={CategoriesPage} />}
        />
      </Routes>
      <ConfirmPopup />
    </ConfirmContextProvider>
  );
};

export default App;
