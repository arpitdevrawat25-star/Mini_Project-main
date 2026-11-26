import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const CarrierGuidance = lazy(() => import("./pages/CarrierGuidance"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const LineCharts = lazy(() => import("./pages/charts/linechart"));
const PieCharts = lazy(() => import("./pages/charts/piechart"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="admin/Profile" element={<Profile />} />
          <Route path="/admin/CarrierGuidance" element={<CarrierGuidance />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
