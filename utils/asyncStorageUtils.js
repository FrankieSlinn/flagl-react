import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const storeScore = async (score) => {
    try {
        await AsyncStorage.setItem("score", JSON.stringify(score));
        console.log("Score stored successfully!");
    } catch (error) {
        console.error("Error saving score", error);
    }
};

export const getStoredScore = async () => {
    try {
        const value = await AsyncStorage.getItem("score");
        if (value !== null) {
            return JSON.parse(value);  // If there is a score, parse it
        }
        return null;  // If no score is stored, return null
    } catch (error) {
        console.error("Error retrieving score", error);
        return null;
    }
};



export const storeGameCount = async (gameCount) => {
    try {
        await AsyncStorage.setItem("gameCount", JSON.stringify(gameCount));
        console.log("gameCount stored successfully!");
    } catch (error) {
        console.error("Error saving score", error);
    }
};

export const getStoredGameCount = async () => {
    try {
        const value = await AsyncStorage.getItem("gameCount");
        if (value !== null) {
            return JSON.parse(value);  // If there is a score, parse it
        }
        return null;  // If no score is stored, return null
    } catch (error) {
        console.error("Error retrieving score", error);
        return null;
    }
};