import React, { useState, useEffect } from "react";
import axios from "axios";
import KycSuccess from "./KycSuccess";
const NonAadhaarKycDetails = ({userId, id, documentType }) => {
  const [isKycComplted, setIsKycCompleted] = useState(false);
  const [error,setError] = useState("");
  const [form, setForm] = useState({
    id:"",
    documentType : "",
    documentNumber: "",
    dob: "",
    name: "",
    gender: "",
  });

useEffect(() => {
  if (id || documentType) {
    setForm((prevForm) => ({
      ...prevForm,
      ...(id && { id }),
      ...(documentType && { documentType }),
    }));
  }
}, [id, documentType]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

  const handleVerify = async () => {
    try {
      const kycResponse = await axios.post(
        "http://localhost:8080/school-user-service/kyc/save-nonAadhaar-kyc",
        form
      );
    setIsKycCompleted(true);

    } catch (error) {
      console.error("Save Error", error);
    }
  };

  return isKycComplted ? (
    <KycSuccess userId={userId} />
  ) : (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Verification <span className="text-pink-600">KYC</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Confirming your identity to ensure security, trust,
        <br />
        and smooth experience.
      </p>

      <div className="grid grid-cols-2 gap-4 text-left mb-6">
        <div>
          <label
            htmlFor="documentNumber"
            className="block text-sm font-medium mb-1"
          >
            Document Number
          </label>
          <input
            id="documentNumber"
            type="text"
            name="documentNumber"
            placeholder="Document Number"
            value={form.documentNumber}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm w-full"
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm w-full"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm w-full"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-sm w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleVerify}
        className="w-full py-2 bg-pink-600 text-white font-medium rounded hover:bg-pink-700"
      >
        Continue
      </button>
    </div>
  );
};

export default NonAadhaarKycDetails;
