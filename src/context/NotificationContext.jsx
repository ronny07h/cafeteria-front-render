import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <i className="fas fa-check-circle me-2"></i>;
      case "error":
        return <i className="fas fa-exclamation-circle me-2"></i>;
      case "warning":
        return <i className="fas fa-exclamation-triangle me-2"></i>;
      default:
        return <i className="fas fa-info-circle me-2"></i>;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-success";
      case "error":
        return "bg-danger";
      case "warning":
        return "bg-warning text-dark";
      default:
        return "bg-primary";
    }
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`toast show align-items-center text-white border-0 mb-2 ${getBgColor(notification.type)}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center">
                {getIcon(notification.type)}
                {notification.message}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => removeNotification(notification.id)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
