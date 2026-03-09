import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';
import useAuth from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import translations from "../../utils/translations";

function FileUpload() {
  const [file, setFile] = useState(null);
  const fileInput = useRef();
  const { setFileUrl, setFileContent, setFileName, setSourceFile, clearFile } = useContext(QuizContext);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const t = translations[language] || {};
  const dir = language === "ar" ? "rtl" : "ltr";

  // const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";
  const API_URL = import.meta.env.VITE_API_URL || "https://edumaster-backend-6xy5.onrender.com";

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      console.log("✅ UPLOAD RESPONSE:", res.data); // DEBUG

      // ✅ ALL THREE SETTERS CALLED
      setFile(selectedFile);
      setSourceFile(selectedFile);
      setFileUrl(res.data.file.url);
      setFileContent(null);
      setFileName(selectedFile.name);

      alert(`✅ ${selectedFile.name} uploaded successfully!`);
    } catch (err) {
      console.error("❌ UPLOAD ERROR:", err.response?.data || err.message);
      alert((t.fileUploadFailed || "Upload failed: ") + (err.response?.data?.message || err.message));
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
      {loading && <div>⏳ {t.fileUploadUploading || "Uploading..."}</div>}
      {file && (
        <div className="text-green-600 font-medium p-3 bg-green-50 rounded-xl" dir={dir}>
          ✅ {file.name} {t.fileUploadReady || "ready for quiz generation"}
          <button
            onClick={clearFile}
            className="ml-4 text-sm text-red-500 hover:underline"
          >
            {t.fileUploadClear || "Clear"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
