import React from "react";
import { CheckCircle, X } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Login from "./Login";
import LoginPage from "../LoginPage";
import KycSuccess from "./KycSuccess";
function AadhaarData({ aadhaarData, userId, id }) {
  const [isAadhharKycCompleted, setAadhaarKycCompleted] = useState(false);

  const saveKyc = async () => {
    try {
      const aadhaarNo = aadhaarData.aadhaarNo;
      const aadhaarKycResponse = await axios.post(
        "http://localhost:8080/school-user-service/kyc/save-aadhaar-kyc",
        {
          id,
          aadhaarNo,
        }
      );
      console.log("User data fetched:", aadhaarKycResponse.data);
      setAadhaarKycCompleted(true);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  return (
    <div>
      {isAadhharKycCompleted ? (
        <KycSuccess userId={userId}/>
      ) : (
        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-md text-center">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button className="text-gray-500 text-xl">←</button>
          </div>

          {/* Title and Description */}
          <h2 className="text-xl font-semibold mb-1">
            Verification <span className="text-pink-600 font-bold">KYC</span>
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-snug">
            Confirming your identity to ensure security, trust, <br />
            and smooth experience.
          </p>

          {/* Alert */}
          <div className="flex items-center bg-green-100 text-green-800 rounded-md px-4 py-2 mb-6 relative text-sm">
            <CheckCircle className="mr-2" size={18} />
            <span className="flex-1">
              Fetched your Aadhaar details for verification.
            </span>
            <X size={16} className="cursor-pointer" />
          </div>

          {/* Aadhaar Info */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm text-left text-gray-800 mb-6">
            <div>
              <span className="block text-xs text-gray-500 mb-1">
                Document Number
              </span>
              {aadhaarData.aadhaarNo}
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">
                Date of Birth
              </span>
              {aadhaarData.dob}
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">
                Your Name
              </span>
              {aadhaarData.name}
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Gender</span>
              {aadhaarData.gender}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={saveKyc}
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default AadhaarData;
