import { createContext, useContext, useState } from 'react';

// Create a context for managing lastScreen
const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [country, setCountry] = useState("");

  return (
    <ScreenContext.Provider value={{ country, setCountry }}>
      {children}
    </ScreenContext.Provider>
  );
};

// Custom hook to use the context
export const useScreenContext = () => useContext(ScreenContext);