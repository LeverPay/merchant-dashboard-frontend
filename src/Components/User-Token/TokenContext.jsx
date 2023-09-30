import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Token = createContext();

export function TokenContext({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });
  };

  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  };

  return (
    <Token.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        notify,
        success,
      }}
    >
      {children}
    </Token.Provider>
  );
}

export default Token;
