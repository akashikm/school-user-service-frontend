import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function DeclarationModal({ onClose }) {
  const [language, setLanguage] = useState("en");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-md p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Declaration</h3>

        {/* Language Tabs */}
        <div className="flex mb-4">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 border-b-2 ${language === "en" ? "border-pink-500 text-pink-600" : "border-transparent text-gray-500"}`}
          >
            Eng (US)
          </button>
          <button
            onClick={() => setLanguage("ml")}
            className={`px-3 py-1 border-b-2 ml-4 ${language === "ml" ? "border-pink-500 text-pink-600" : "border-transparent text-gray-500"}`}
          >
            Malayalam
          </button>
        </div>

        {/* Language Content */}
        {language === "en" ? (
            <div className="text-sm text-gray-700 mb-4 text-left text-justify">
                I hereby give my consent to K-SMART Kerala to obtain my Aadhaar number and name for authentication with UIDAI. Ksmart Kerala has informed me that my identity information will only be used for authentication purposes. In case of a child below 18 years, the parent/legal guardian has the responsibility for giving the consent for sharing information of the child.
          </div>
        ) : (
        <div className="text-sm text-gray-700 mb-4 text-left text-justify">
            ഞാൻ എന്റെ ആധാർ നമ്പറും പേരും UIDAI യുമായി സ്ഥിരീകരണത്തിന് ലഭ്യമാക്കുന്നതിനായി കെ-സ്മാർട്ട് കേരളയ്ക്ക് എന്റെ സമ്മതം നൽകുന്നു. എന്റെ തിരിച്ചറിയൽ വിവരങ്ങൾ സ്ഥിരീകരണത്തിനായാണ് മാത്രം ഉപയോഗിക്കപ്പെടുക എന്നതാണ് കെ-സ്മാർട്ട് കേരള അറിയിച്ചിരിക്കുന്നത്. 18 വയസ്സിനു താഴെയുള്ള കുട്ടികളുടെ വിവരങ്ങൾ പങ്കിടുന്നതിന് മാതാപിതാക്കൾ/നിയമപരമായ രക്ഷകര്‍ത്താവ് ഉത്തരവാദിത്വം വഹിക്കുക.
          </div>
        )}

        {/* Checkbox */}
        <label className="flex items-center mb-6 text-sm text-gray-800">
          <input
            type="checkbox"
            className="form-checkbox text-pink-600 mr-2"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          I Agree
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-50"
          >
            Close
          </button>
          <button
            disabled={!agreed}
            className={`px-4 py-2 rounded text-white ${agreed ? "bg-pink-500 hover:bg-pink-600" : "bg-pink-200 cursor-not-allowed"}`}
          >
            <NavLink to="/register"> Proceed </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeclarationModal;
