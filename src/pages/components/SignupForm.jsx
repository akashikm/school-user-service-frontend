import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import RegistrationCompletion from "./RegistrationCompletion";
import Footer from "./Footer";
import LeftPanel from "./LeftPanel";
function SignupForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countryType, setCountryType] = useState(true);
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpKey, setOtpKey] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [id, setId] = useState("");


  const validate = () => {
    if (countryType === true) {
      if (!/^\d{10}$/.test(phoneNumber)) {
        setError("Please enter a valid 10-digit mobile number.");
        return false;
      }
    } else {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Please enter a valid email ID.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSendOTP = async () => {
    if (validate()) {
      try {
        const sendOtpResponse = await axios.post(
          "http://localhost:8080/school-user-service/user-service/sendOtp",
          {
            phoneNumber,
            email,
            countryType,
          }
        );

        setOtpKey(sendOtpResponse.data.payload.otpKey);
        setShowOtpSection(true); // Show OTP section
      } catch (error) {
        setError("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const saveUserResponse = await axios.post(
        "http://localhost:8080/school-user-service/user-service/save-user-registration",
        {
          phoneNumber,
          email,
          countryType,
          otp,
          otpKey,
        }
      );
      const uId = saveUserResponse.data.payload.id;
      setId(uId);
      setRegistrationComplete(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen relative bg-gray-50">
      {/* Footer: bottom, full width */}
      <div className="fixed bottom-0 left-0 w-full min-h-[60px] bg-gray-200 z-10">
        <Footer />
      </div>

      {/* SidePanel: full width, positioned above Footer */}
      <div className="fixed bottom-[60px] left-0 w-full h-[calc(100%-60px)] bg-white z-0">
        <LeftPanel />
        <div className="absolute top-16 right-16 bottom-16 w-[500px] bg-white rounded-lg p-6">
          {registrationComplete ? (
            <RegistrationCompletion userId={phoneNumber || email} id={id} />
          ) : (
            <div className="flex items-center justify-center bg-gray-50">
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                {/* Back */}
                <NavLink to="/">
                  <button className="mb-4 text-gray-500 hover:text-gray-700">
                    ←
                  </button>
                </NavLink>

                {/* Headings */}
                <h2 className="text-center text-2xl font-semibold mb-1">
                  Sign Up{" "}
                  <span className="text-pink-600 font-bold">K-SMART</span>
                </h2>
                <h3 className="text-center text-lg font-semibold text-blue-900">
                  Registration
                </h3>
                <p className="text-center text-gray-600 text-sm mt-1 mb-6">
                  To complete your registration, please fill in all the fields
                  below
                </p>

                {!showOtpSection && (
                  <>
                    {/* Location Selection */}
                    <div className="flex justify-center gap-6 mb-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="India"
                          checked={countryType === true}
                          onChange={() => {
                            setCountryType(true);
                            setError("");
                            setEmail("");
                          }}
                        />
                        India
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="Abroad"
                          checked={countryType === false}
                          onChange={() => {
                            setCountryType(false);
                            setError("");
                            setPhoneNumber("");
                          }}
                        />
                        Abroad
                      </label>
                    </div>

                    {/* Conditional Input */}
                    {countryType === true ? (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          placeholder="XXXXXXXXXX"
                          maxLength={10}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email ID
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </>
                    )}

                    {/* Send OTP Button */}
                    <button
                      onClick={handleSendOTP}
                      className="w-full py-3 mt-4 text-white bg-pink-500 hover:bg-pink-600 rounded-md font-medium"
                    >
                      Send OTP
                    </button>
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

                    <button
                      onClick={handleVerifyOTP}
                      className="w-full py-3 mt-4 text-white bg-green-600 hover:bg-green-700 rounded-md font-medium"
                    >
                      Verify
                    </button>
                  </>
                )}
                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-500 mt-1 mb-4">{error}</p>
                )}

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-10">
                  If you have an account?
                  <span className="text-blue-800 font-semibold ml-1 cursor-pointer hover:underline">
                    <NavLink to="/"> Login </NavLink>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
