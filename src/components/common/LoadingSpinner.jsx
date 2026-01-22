import React from "react";

const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">{message}</span>
        </div>
        <p className="mt-3 text-muted">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
