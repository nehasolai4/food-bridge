import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DonateFood from "./pages/DonateFood";
import FindFood from "./pages/FindFood";
import RequestSent from "./pages/RequestSent";
import DonorDashboard from "./pages/DonorDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/find-food" element={<FindFood />} />
        <Route path="/request-sent" element={<RequestSent />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;