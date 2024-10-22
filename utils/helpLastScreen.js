import { createContext, useContext, useState } from 'react';

// Create a context for managing lastScreen
const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [lastScreen, setLastScreen] = useState("");

  return (
    <ScreenContext.Provider value={{ lastScreen, setLastScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};

// Custom hook to use the context
export const useScreenContext = () => useContext(ScreenContext);
