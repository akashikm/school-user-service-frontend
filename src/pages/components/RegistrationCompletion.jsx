import React from "react";
import { NavLink } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // optional, or use an img tag
import RegistrationAadhaar from "./RegistrationAadhaar";
import { useState } from "react";

function RegistrationCompletion({ userId, id }) {
  const [kycInitiated, setKycInitiated] = useState(false);

  return (
    <div className="flex items-center justify-center bg-gray-50">
      {kycInitiated ? (
        <RegistrationAadhaar userId={userId} id={id} />
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          {/* Back button */}
          <div className="text-gray-500 mb-4">
            <button
              className="text-xl"
              onClick={() => (window.location.href = "/")}
            >
              &larr;
            </button>
          </div>

          {/* Headings */}
          <h2 className="text-2xl font-semibold">
            Sign Up <span className="text-pink-600 font-bold">K-SMART</span>
          </h2>
          <h3 className="text-blue-900 font-semibold text-lg mt-1">
            Registration
          </h3>
          <p className="text-sm text-gray-600 mt-1 mb-6">
            To complete your registration, please fill in all the fields below
          </p>

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>

          {/* Message */}
          <h4 className="text-blue-900 font-semibold text-lg mb-2">
            User Account Created
          </h4>
          <p className="text-sm text-gray-700 mb-1 px-2">
            You are about to begin the KYC verification process. This will
            require you to provide personal information and upload documents.
          </p>
          <p className="text-sm text-gray-700 mb-4">
            User ID :{" "}
            <span className="text-blue-800 font-semibold">{userId}</span>
          </p>

          {/* Proceed Button */}
          <button
            onClick={() => setKycInitiated(true)}
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md"
          >
            Proceed to KYC
          </button>
          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6">
            If you have an account?{" "}
            <NavLink
              to="/"
              className="text-blue-800 font-semibold hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default RegistrationCompletion;
