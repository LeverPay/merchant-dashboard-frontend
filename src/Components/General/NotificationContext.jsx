import React, { createContext, useState } from "react";
import message from "../Notification-messages/Data";

const Notifications = createContext();

export function NotificationContext({ children }) {
  const [notification, setNotification] = useState(message);
  console.log(notification);
  const deletNotifications = () => {
    setNotification([]);
  };

  const markRead = (item) => {
    const updateData = [...notification];
    updateData[item].read = true;
    setNotification(updateData);
  };

  return (
    <Notifications.Provider
      value={{ notification, deletNotifications, markRead, setNotification }}
    >
      {children}
    </Notifications.Provider>
  );
}

export default Notifications;
