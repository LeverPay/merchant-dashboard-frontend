import React, { createContext, useState } from "react";

const Token = createContext();

export function TokenContext({ children }) {
  const [userToken, setUserToken] = useState(null);
  return (
    <Token.Provider value={{ userToken, setUserToken }}>
      {children}
    </Token.Provider>
  );
}

export default Token;
