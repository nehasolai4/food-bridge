import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DonateFood from "./pages/DonateFood";
import FindFood from "./pages/FindFood";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/find-food" element={<FindFood />} />
      </Routes>
    </Router>
  );
}

export default App;