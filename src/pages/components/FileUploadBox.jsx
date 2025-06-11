import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiFile } from "react-icons/fi";

const FileUploadBox = ({ onFileUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "application/pdf": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      console.log("Accepted files:", acceptedFiles);
      setUploadedFiles(acceptedFiles);
      onFileUpload(acceptedFiles);
    },
  });

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        {...getRootProps()}
        className="w-[170px] h-[100px] border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer flex items-center justify-center bg-white shadow-sm"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-1">
          <p className="font-medium text-sm">Drag & drop file here</p>
          <p className="text-xs text-gray-500 text-center">
            JPEG, PNG, PDF, JPG formats, up to 5MB
          </p>
          <button className="px-3 py-1 text-xs border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
            Browse File
          </button>
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="text-sm mt-2 text-center flex items-center justify-center gap-2 text-gray-700">
          <FiFile className="text-3xl" />
        </div>
      )}
    </div>
  );
};

export default FileUploadBox;
