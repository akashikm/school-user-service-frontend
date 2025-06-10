import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import AadhaarData from "./AadhaarData";
import NonAadhaarKyc from "./NonAadhaarKyc";

function RegistrationAadhaar({ userId, id }) {
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [userData, setUserData] = useState(null);
  // const [id, setId] = useState("");
  const [otpKey, setOtpKey] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [aadhaarData, setAadhaarData] = useState("");
  const [isAadharData, setIsAadhaarData] = useState(false);
  const [isNonAadhaar, setIsNonAadhaar] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const searchResponse = await axios.post(
          "http://localhost:8080/school-user-service/user-service/search-user",
          { userId }
        );
        if (searchResponse.data && searchResponse.data.payload) {
          setUserData(searchResponse.data.payload);
        } else {
          console.error("Unexpected response structure:", searchResponse.data);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const validateAadhaar = () => {
    if (!/^\d{12}$/.test(aadhaarNo)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return false;
    }
    setError("");
    return true;
  };

  const handleGetOtp = async () => {
    if (userData.registrationStatus === 2) {
      if (validateAadhaar()) {
        try {
          id=userData.id;
          const sendOtpResponse = await axios.post(
            "http://localhost:8080/school-user-service/kyc/send-aadhaar-otp",
            {
              id,
              aadhaarNo,
            }
          );

          setOtpKey(sendOtpResponse.data.payload.otpKey);
          setShowOtpSection(true); // Show OTP section
          setMessage("OTP is send to registered user id : " + userId);
        } catch (error) {
          console.error("Failed to send OTP:", error);
          setError("Failed to send OTP. Please try again.");
        }
      }
    } else if (userData.registrationStatus === 1) {
      setError("User registration is not complted.");
    } else if (userData.registrationStatus === 3) {
      setError("User registration is already completed.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      id=userData.id;
      const aadhaarResponse = await axios.post(
        "http://localhost:8080/school-user-service/kyc/get-aadhaar-data",
        {
          id,
          aadhaarNo,
          otp,
          otpKey,
        }
      );
      console.log("User data fetched:", aadhaarResponse.data);
      setAadhaarData(aadhaarResponse.data.payload);
      setIsAadhaarData(true);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {isNonAadhaar ? (
        <NonAadhaarKyc userId ={userId} id={id} />
      ) : isAadharData ? (
        <AadhaarData aadhaarData={aadhaarData} userId= {userId} id={id} />
      ) : (
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
          {/* Back Arrow */}
          <div className="text-gray-500 mb-4">
            <button
              className="text-xl"
              onClick={() => (window.location.href = "/")}
            >
              &larr;
            </button>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold mb-1">
            Verification <span className="text-pink-600 font-bold">KYC</span>
          </h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            Confirming your identity to ensure security, trust, <br /> and
            smooth experience.
          </p>

          {!showOtpSection && (
            <>
              {/* Aadhaar Field */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </label>
              <input
                type="text"
                placeholder="XXXXXXXXXXXX"
                maxLength={12}
                value={aadhaarNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,12}$/.test(value)) {
                    setAadhaarNo(value);
                  }
                  setError("");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

              {/* Get OTP Button */}
              <button
                onClick={handleGetOtp}
                className="w-full py-3 mt-6 text-white bg-pink-500 hover:bg-pink-600 rounded-md font-medium"
              >
                Get OTP
              </button>
            </>
          )}
          {/* OTP Verification Section */}
          {showOtpSection && (
            <>
              {message && (
                <p className="text-sm text-green-800 bg-green-100 px-4 py-2 rounded mt-1">
                  {message}
                </p>
              )}

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
                }}
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p
                onClick={(e) => {
                  handleGetOtp();
                  e.target.value = null;
                }}
                className="text-sm text-blue-700 hover:underline cursor-pointer text-right mt-2 transition duration-200 ease-in-out active:scale-95"
              >
                Resend OTP
              </p>

              <button
                onClick={handleVerifyOTP}
                className="w-full py-3 mt-4 text-white bg-green-600 hover:bg-green-700 rounded-md font-medium"
              >
                Verify
              </button>
            </>
          )}

          {/* No Aadhaar Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            I don't have Aadhaar{" "}
            <span className="text-blue-800 font-semibold ml-1 cursor-pointer hover:underline" 
              onClick={() => setIsNonAadhaar(true)}>
              Click here
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default RegistrationAadhaar;
