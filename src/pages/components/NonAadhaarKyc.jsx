import React, { useState, useEffect } from "react";
import axios from "axios";
import NonAadhaarKycDetails from "./NonAadhaarKycDetails";

const formatName = (name) =>
  name
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

const NonAadhaarKyc = ({ userId, id }) => {
  const [selectedCode, setSelectedCode] = useState(null);
  const [docOptions, setDocOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isContinue, setIsContinue] = useState(false);

  useEffect(() => {
    const fetchDocumentOptions = async () => {
      try {
        const kycResponse = await axios.get(
          "http://localhost:8080/school-user-service/kyc/get-document-types"
        );
        setDocOptions(kycResponse.data);
      } catch (error) {
        console.error("Failed to fetch document options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentOptions();
  }, []);

  const handleRadioChange = (e) => {
    setSelectedCode(parseInt(e.target.value, 10));
  };

  const handleContinue = () => {
    if (selectedCode != null) {
      setIsContinue(true);
    }
  };

  return isContinue ? (
    <NonAadhaarKycDetails
      userId={userId}
      id={id}
      documentType={selectedCode}
    />
  ) : (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6 relative">
      {/* Back Arrow */}
      <div className="absolute top-4 left-4 text-gray-500 cursor-pointer text-xl">
        &larr;
      </div>

      <h2 className="text-center text-xl font-semibold text-gray-800 mb-1">
        Verification <span className="text-pink-600">KYC</span>
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Confirming your identity to ensure security, trust <br /> and smooth
        experience.
      </p>

      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          Upload any of the following Documents
        </p>
        {loading ? (
          <p className="text-gray-400 text-sm">Loading options...</p>
        ) : (
          <div className="flex flex-col gap-2 text-sm text-gray-800">
            {docOptions.map((doc) => (
              <label
                key={doc.code}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="kyc-doc"
                  value={doc.code}
                  checked={selectedCode === doc.code}
                  onChange={handleRadioChange}
                />
                {formatName(doc.name)}
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-2 bg-pink-600 text-white font-medium rounded-md shadow-md hover:bg-pink-700"
      >
        Continue
      </button>
    </div>
  );
};

export default NonAadhaarKyc;
