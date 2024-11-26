import React, { createContext, useContext } from 'react';
import { useSharedValue } from 'react-native-reanimated';

// Create the context
const SharedContext = createContext();

// Provide the context
export const SharedProvider = ({ children }) => {
    // Initialize the shared value
    const keyboardOffset = useSharedValue(0); // Value initialized to 0

    return (
        <SharedContext.Provider value={{ keyboardOffset }}>
            {children}
        </SharedContext.Provider>
    );
};

// Hook to use the context
export const useShared = () => {
    const context = useContext(SharedContext);
    if (!context) {
        throw new Error('useShared must be used within a SharedProvider');
    }
    return context;
};
