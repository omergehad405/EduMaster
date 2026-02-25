import React, { useRef, useState } from "react";

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

function FileUpload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInput = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemove = () => setFile(null);

  return (
    <section className=" bg-(--main-color) shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
      {/* File Icon Animation */}
      <div className="mb-4">
        <span
          className={`inline-block transition-transform duration-300 ${dragActive ? "animate-bounce" : ""
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-(--second-color)"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v9h6V3" />
          </svg>
        </span>
      </div>
      {/* Drag & Drop Zone */}
      <div
        className={`w-full border-2 ${dragActive
          ? "border-blue-400 bg-blue-50"
          : "border-dashed border-gray-300 bg-gray-50"
          }  border-dashed rounded-xl flex flex-col items-center justify-center py-8 transition-colors duration-150 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInput.current.click()}
      >
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-(--second-color)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17v-6m0 0l-3 3m3-3l3 3M5 19h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="font-semibold text-(--second-color)">{file.name}</p>
            <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
            <button
              className="text-xs text-red-500 underline"
              onClick={e => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              Remove
            </button>
            {/* Preview (only for images) */}
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="mt-2 max-h-40 rounded shadow"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="font-semibold text-gray-600">Drag &amp; Drop your file here</p>
            <p className="text-sm text-gray-400 mt-1">or click to select a file</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInput}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
        />
      </div>
      {/* Supported formats text */}
      <p className="mt-4 text-xs text-gray-400">Supported formats: PDF, Word, JPG, PNG, TXT</p>
      {/* Upload button */}
      {!file && (
        <button
          className="mt-6 w-full py-2 rounded-lg bg-(--second-color) text-(--main-color) font-semibold shadow hover:bg-(--second-color) cursor-pointer active:bg-blue-800 transition-colors"
          onClick={() => fileInput.current.click()}
          type="button"
        >
          Upload File
        </button>
      )}
      {/* Generate Quiz CTA */}
      {file && (
        <button
          className="mt-6 w-full py-2 rounded-lg bg-green-600 text-(--main-color) font-semibold shadow hover:bg-green-700 active:bg-green-800 transition-colors"
          type="button"
        // Add onClick here to trigger quiz generation
        >
          Generate Quiz
        </button>
      )}
      {/* Small hint text */}
      <p className="mt-2 text-xs text-gray-300">Max file size: 5MB</p>
    </section>
  );
}

export default FileUpload;