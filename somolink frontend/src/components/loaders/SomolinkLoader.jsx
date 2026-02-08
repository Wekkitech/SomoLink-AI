import React from "react";

export default function SomolinkLoader({ size = 56 }) {
  return (
    <div
      className="somolink-creative-loader"
      style={{ width: size, height: size }}
    >
      {/* Spinner */}
      <svg className="spinner" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
      </svg>

      {/* Book */}
      <div className="book">
        <span className="page left" />
        <span className="page right" />
      </div>

      {/* WiFi */}
      <div className="wifi">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
