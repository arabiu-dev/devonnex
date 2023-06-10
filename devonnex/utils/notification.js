import React, { useState, useEffect } from "react";
import { CloseOutline } from "@/utils/Icons";
const useNotificationDisplay = (initialNotification, durationInSeconds) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let timeout;

    if (notification) {
      timeout = setTimeout(() => {
        setNotification(null);
      }, durationInSeconds * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [notification, durationInSeconds]);

  const displayNotification = (newNotification) => {
    const toast = (
      <div className={`notification-toast`} data-toast>
        <button
          className="toast-close-btn"
          onClick={() => setNotification(null)}
          data-toast-close
        >
          <CloseOutline />
        </button>
        {newNotification}
      </div>
    );
    setNotification(toast);
  };

  return [displayNotification, notification];
};

export default useNotificationDisplay;
