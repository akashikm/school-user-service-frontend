import LoginPage from "./LoginPage";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import RegistrationAadhaar from "./components/RegistrationAadhaar";
import SignupForm from "./components/SignupForm";
function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/aadhaar-kyc" element={<RegistrationAadhaar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default MainPage;
