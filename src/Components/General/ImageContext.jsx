import React, { createContext, useState } from "react";

const profileImg = createContext();
export function ImageContext({ children }) {
  const [vectorImage, setVectorImage] = useState(null);
  return (
    <profileImg.Provider value={{ vectorImage, setVectorImage }}>
      {children}
    </profileImg.Provider>
  );
}

export default profileImg;
