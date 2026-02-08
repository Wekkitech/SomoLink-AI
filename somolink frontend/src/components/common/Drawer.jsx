import React from "react";
import { X } from "lucide-react";

export default function Drawer({ open, onClose, title, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
