import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const storeTurns = async (turns) => {
    try {
        await AsyncStorage.setItem("score", JSON.stringify(turns));
        console.log("Turnsstored successfully!");
    } catch (error) {
        console.error("Error saving turns", error);
    }
};

export const getStoredTurns = async () => {
    try {
        const value = await AsyncStorage.getItem("turns");
        if (value !== null) {
            return JSON.parse(value);  // If there is a score, parse it
        }
        return null;  // If no score is stored, return null
    } catch (error) {
        console.error("Error retrieving turns", error);
        return null;
    }
};


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

export const storeAllScores = async (scoreArray) => {
    try {
        await AsyncStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        console.log("scoreArray stored successfully!");
    } catch (error) {
        console.error("Error saving scoreArray", error);
    }
};

export const getAllStoredScores = async () => {
    try {
      const scoreArray = await AsyncStorage.getItem("scoreArray");
      console.log("Raw scoreArray from AsyncStorage:", scoreArray); // Log what AsyncStorage returns
      return scoreArray ? JSON.parse(scoreArray) : [];  // Return empty array if null
    } catch (error) {
      console.error("Error fetching scoreArray:", error);
      return [];
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