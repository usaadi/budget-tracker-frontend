import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./lib/auth/ProtectedRoute";

import SummaryPage from "./components/app/pages/SummaryPage";
import ExpensesPage from "./components/app/pages/ExpensesPage";
import IncomePage from "./components/app/pages/IncomePage";
import CategoriesPage from "./components/app/pages/CategoriesPage";
import AppLayout from "./components/shared/AppLayout";

const AppRouter = ({ activeDateRange, setActiveDateRange }) => {
  return (
    <AppLayout
      activeDateRange={activeDateRange}
      setActiveDateRange={setActiveDateRange}
    >
      <Routes>
        <Route
          path="summary"
          element={
            <ProtectedRoute
              component={SummaryPage}
              activeDateRange={activeDateRange}
            />
          }
        />
        <Route
          path="expenses"
          element={
            <ProtectedRoute
              component={ExpensesPage}
              activeDateRange={activeDateRange}
            />
          }
        />
        <Route
          path="income"
          element={
            <ProtectedRoute
              component={IncomePage}
              activeDateRange={activeDateRange}
            />
          }
        />
        <Route
          path="categories"
          element={
            <ProtectedRoute
              component={CategoriesPage}
              activeDateRange={activeDateRange}
            />
          }
        />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
