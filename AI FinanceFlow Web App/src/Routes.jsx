import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import AccountSettings from './pages/account-settings';
import BudgetManagement from './pages/budget-management';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import ExpenseTracking from './pages/expense-tracking';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountSettings />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/budget-management" element={<BudgetManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expense-tracking" element={<ExpenseTracking />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
