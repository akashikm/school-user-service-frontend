import { useState } from "react";
import DeclarationModal from "./DeclarationModal";
import axios from "axios";
import { NavLink } from "react-router-dom";
import RegistrationAadhaar from "./RegistrationAadhaar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpKey, setOtpKey] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(1);
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const [id,setId] = useState();
  const handleCreateClick = () => {
    setShowModal(true);
  };

  const validate = () => {
    const isMobile = /^\d{10}$/.test(userId);
    const isEmail = /^\S+@\S+\.\S+$/.test(userId);
    if (!isMobile && !isEmail) {
      setError("Please enter a valid user name.");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSendOTP = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/school-user-service/user-service/send-login-otp",
          {
            userId,
          }
        );

        setOtpKey(response.data.payload.otpKey);
        setShowOtpSection(true);
        // You can show success message or move to next step here
      } catch (error) {
        console.error("Failed to send OTP:", error);
        setError(error.response.data.message);
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const loginResponse = await axios.post(
        "http://localhost:8080/school-user-service/user-service/user-login",
        {
          userId,
          otp,
          otpKey,
        }
      );
      const regStatus = loginResponse.data.payload.registrationStatus;
      const stat = loginResponse.data.payload.status;
      const uId = loginResponse.data.payload.id;
      setId(uId);
      setRegistrationStatus(regStatus);
      setStatus(stat);
      if (regStatus === 3) navigate("/dashboard");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setOtpError(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {registrationStatus === 2 ? (
        <RegistrationAadhaar userId={userId} id={id} />
      ) : (
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
          {/* Back arrow */}
          <div className="text-gray-500 mb-4">
            <button
              className="text-xl"
              onClick={() => (window.location.href = "/")}
            >
              &larr;
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-medium text-center mb-1">
            Sign in <span className="text-pink-600 font-bold">K-SMART</span>
          </h2>
          {!showOtpSection && (
            <>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-1">
                Login
              </h3>
              <div className="text-center text-sm text-gray-500 mb-6">
                Please enter your login details below
              </div>

              {/* Input field */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="userId"
                >
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  placeholder="Enter here"
                  onChange={(e) => {
                    setUserId(e.target.value), setError("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-500 mt-1 mb-4">{error}</p>
              )}

              {/* Button */}
              <button
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-md transition"
                onClick={handleSendOTP}
              >
                Send OTP
              </button>
              <br />
              <br />
              <br />
              <br />
            </>
          )}
          {/* OTP Verification Section */}
          {showOtpSection && (
            <>
              <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only digits and max 6 characters
                  if (/^\d{0,6}$/.test(value)) {
                    setOtp(value);
                  }
                  setOtpError("");
                }}
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p
                onClick={handleSendOTP}
                className="text-sm text-blue-700 hover:underline cursor-pointer text-right mt-2 transition duration-200 ease-in-out active:scale-95"
              >
                Resend OTP
              </p>
              {otpError && (
                <p className="text-sm text-red-500 mt-1 mb-4">{otpError}</p>
              )}
              <button
                onClick={handleVerifyOTP}
                className="w-full py-3 mt-4 text-white bg-green-600 hover:bg-green-700 rounded-md font-medium"
              >
                Verify
              </button>
            </>
          )}

          {/* Links */}
          <div className="text-center text-sm mt-6 text-gray-600">
            <div>
              If you don't have an account?
              <span
                className="font-semibold text-gray-900 cursor-pointer ml-1 hover:underline"
                onClick={handleCreateClick}
              >
                Create Account
              </span>
              {showModal && (
                <DeclarationModal onClose={() => setShowModal(false)} />
              )}
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-900 cursor-pointer hover:underline">
                Forgot User ID?
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
