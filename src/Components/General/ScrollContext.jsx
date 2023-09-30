import React from "react";
import { createContext, useState, useEffect } from "react";

const Scroll = createContext();

export function ScrollContext({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contextValue = {
    scrollToTop,
    isVisible,
  };

  return (
    <Scroll.Provider value={contextValue}>
      {children}
    </Scroll.Provider>
  );
}

export default Scroll;
