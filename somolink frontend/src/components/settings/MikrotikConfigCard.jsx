import React, { useState } from "react";
import {
  Upload,
  FileCode,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const MikrotikConfigCard = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setSuccess(false);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setUploading(true);
    setProgress(0);
    setSuccess(false);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_URL}/mikrotik/upload`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setSuccess(true);
          setSelectedFiles([]);
        }
      };

      xhr.onerror = () => {
        alert("Upload failed");
      };

      xhr.send(formData);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b border-gray-100 pb-3">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Upload MikroTik Hotspot HTML Files
        </span>
        <p className="text-[11px] text-gray-500 mt-1">
          Files will be uploaded directly to <b>/hotspot</b>
        </p>
      </div>

      {/* File Picker */}
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
        <Upload size={20} className="text-gray-400" />
        <span className="text-xs font-medium text-gray-600">
          Click to select HTML files
        </span>
        <span className="text-[10px] text-gray-400">
          login.html, student.html, community.html
        </span>
        <input
          type="file"
          multiple
          accept=".html"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-white"
            >
              <FileCode size={14} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-700">
                  {file.name}
                </div>
                <div className="text-[10px] text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      {uploading && (
        <div className="space-y-1">
          <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 text-right">
            Uploading… {progress}%
          </p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2 text-green-600 text-xs">
          <CheckCircle2 size={14} />
          Files uploaded successfully to MikroTik
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleUpload}
          disabled={!selectedFiles.length || uploading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded text-xs font-medium shadow-sm transition-all"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          Upload Files
        </button>
      </div>
    </div>
  );
};

export default MikrotikConfigCard;
