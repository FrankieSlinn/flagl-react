import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const storeTurns = async (turns) => {
    try {
        await AsyncStorage.setItem("turns", JSON.stringify(turns));
        console.log("Turnsstored successfully!", turns);
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
  



export const storeCountryUnderscore = async (countryUnderscore) => {
    try {
        await AsyncStorage.setItem("countryUnderscore", JSON.stringify(countryUnderscore));
        console.log("Country stored successfully!");
    } catch (error) {
        console.error("Error saving countryUnderscore", error);
    }
};

export const getStoredCountryUnderscore= async () => {
    try {
        const value = await AsyncStorage.getItem("countryUnderscore");
        if (value !== null) {
            return JSON.parse(value);  // If there is a country, parse it
        }
        return null;  // If no country is stored, return null
    } catch (error) {
        console.error("Error retrieving countryUnderscore", error);
        return null;
    }
};

export const storeArrayDailyFlags = async (arrayDailyFlags) => {
    try {
        await AsyncStorage.setItem("arrayDailyFlags", JSON.stringify(arrayDailyFlags));
        console.log("arrayDailyFlags stored successfully!");
    } catch (error) {
        console.error("Error saving arrayDailyFlags", error);
    }
};

export const getStoredArrayDailyFlags= async () => {
    try {
        const value = await AsyncStorage.getItem("arrayDailyFlags");
        if (value !== null) {
            return JSON.parse(value);  // If there is a country, parse it
        }
        return null;  // If no country is stored, return null
    } catch (error) {
        console.error("Error retrieving arrayDailyFlags", error);
        return null;
    }
};