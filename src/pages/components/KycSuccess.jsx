import React from "react";
import { CheckCircle } from "lucide-react"; // Optional: install 'lucide-react' or use any checkmark SVG/icon
import { NavLink } from "react-router-dom";
const KycSuccess = ({ userId }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 text-center relative">
      {/* Back Arrow */}
      <div className="absolute top-4 left-4 text-gray-500 cursor-pointer text-xl">
        <NavLink to="/"> &larr;</NavLink>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Verification <span className="text-pink-600">KYC</span>
      </h2>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        Confirming your identity to ensure security, trust,
        <br />
        and smooth experience.
      </p>

      {/* Success Icon */}
      <div className="flex justify-center my-6">
        <div className="bg-green-100 p-4 rounded-full">
          <CheckCircle size={48} className="text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <p className="text-blue-700 font-semibold text-lg mb-2">
        KYC verification success !
      </p>
      <p className="text-sm text-gray-600 mb-4">
        You can now access KSMART services. Click <strong>"Proceed"</strong> to
        continue.
      </p>

      {/* User ID */}
      <p className="text-sm text-gray-700 mb-4">
        User ID : <span className="text-blue-800 font-semibold">{userId}</span>
      </p>

      {/* Proceed Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="w-full py-2 bg-pink-600 text-white font-medium rounded-md shadow-md hover:bg-pink-700"
      >
        Proceed
      </button>
    </div>
  );
};

export default KycSuccess;
