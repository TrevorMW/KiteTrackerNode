import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import SubmitPage from "../pages/Submit/SubmitPage";
import Layout from "../components/Layout";

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/submit" element={<SubmitPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;