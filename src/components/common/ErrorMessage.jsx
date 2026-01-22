import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="fas fa-exclamation-triangle me-3"></i>
      <div className="flex-grow-1">
        <h5 className="alert-heading">Error</h5>
        <p className="mb-0">{message}</p>
      </div>
      {onRetry && (
        <button className="btn btn-outline-danger ms-3" onClick={onRetry}>
          <i className="fas fa-redo"></i> Reintentar
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
