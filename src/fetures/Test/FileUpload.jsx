import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';

function FileUpload() {
  const [file, setFile] = useState(null);
  const fileInput = useRef();
  const { setFileUrl, setFileContent, setFileName, clearFile } = useContext(QuizContext);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      console.log("✅ UPLOAD RESPONSE:", res.data); // DEBUG

      // ✅ ALL THREE SETTERS CALLED
      setFile(selectedFile);
      setFileUrl(res.data.file.url);
      setFileContent(res.data.file.content);
      setFileName(res.data.file.name);  // 🚨 THIS WAS MISSING!

      alert(`✅ ${selectedFile.name} uploaded successfully!`);
    } catch (err) {
      console.error("❌ UPLOAD ERROR:", err.response?.data || err.message);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <input
        type="file"
        ref={fileInput}
        onChange={handleUpload}
        className="border p-2 rounded w-full max-w-sm"
        accept=".pdf,.docx,.txt"
      />
      {loading && <div>⏳ Uploading...</div>}
      {file && (
        <div className="text-green-600 font-medium p-3 bg-green-50 rounded-xl">
          ✅ {file.name} ready for quiz generation
          <button
            onClick={clearFile}
            className="ml-4 text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
