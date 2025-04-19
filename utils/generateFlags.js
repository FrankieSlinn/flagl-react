import { murmurHash3, generateRandomNumber } from "./randomNumberFromSeed.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { flags } from "./countryTerritoryNames.js";
import {
  getStoredArrayDailyFlags,
  storeArrayDailyFlags,
} from "./asyncStorageUtils.js";

let generate_seed;
let random_number;

const fetchOrGenerateFlags = async (
  newGame,
  setNewGame,
  setArrayDailyFlags,
  arrayFlagNames,
  setArrayFlagNames
) => {
  let fullDate = new Date();
  //Today's date split into three values
  let year = String(fullDate.getFullYear());
  let month = String(fullDate.getMonth() + 1);
  let day = String(fullDate.getDate());
  //number based on current date which is used as dateInputForSeed
  let dateNumberSeed = day + month + year;
  console.log("datenumnerseed", dateNumberSeed);
  generate_seed = murmurHash3(dateNumberSeed);
  random_number = generateRandomNumber(generate_seed(), generate_seed());

  try {
    storeArrayDailyFlags([]);
    const storedFlags = await getStoredArrayDailyFlags(); // Retrieve stored flags
    const storedDate = await AsyncStorage.getItem("flagGenerationDate"); // Retrieve the stored generation date
    console.log("fetchOrGenerateFlags function is running in practice&Dailly");
    //if game reset
    if (newGame === true) {
      setNewGame(false);
      console.log(
        "newGame is true, now generating new flags to populate arrayDailyFlags"
      );
      generateNewFlagsToPopulateArrayDailyFlags(
        storedFlags,
        setArrayDailyFlags,
        arrayFlagNames,
        setArrayFlagNames
      );
    } else {
      console.log("getchorGenerateFlags doesn't fit in if or else");
    }
  } catch (error) {
    console.error("Error fetching or generating flags:", error);
  }
};

const generateNewFlagsToPopulateArrayDailyFlags = async (
  arrayDailyFlags,
  setArrayDailyFlags,
  arrayFlagNames,
  setArrayFlagNames
) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const showStoredArrayDailyFlags = await getStoredArrayDailyFlags();
    console.log("generateNewFlagsToPopulateArrayDailyFlagsRunning");
    let newFlags = showStoredArrayDailyFlags;
    // Generate new flags
    while (newFlags.length < 5) {
      let newFlagItem = Math.abs(Math.floor(random_number() * 225));
      if (!newFlags.includes(newFlagItem)) {
        newFlags.push(newFlagItem);
      }
    }
    console.log("newFlags generated", newFlags);
    // Store new flags and the current date
    setArrayDailyFlags(newFlags);
    storeArrayDailyFlags(newFlags);
    console.log("showStoredArrayDailyFlags", showStoredArrayDailyFlags);
    AsyncStorage.setItem("flagGenerationDate", today);
    // Update flag names based on new flags
    populateFlagNames(setArrayFlagNames);
    return newFlags; // Return the new flags to update state
  } catch (error) {
    console.error("Error generating new flags:", error);
  }
};

//Create array of flagnames. Facilitates flag display.
const populateFlagNames = async (setArrayFlagNames) => {
  try {
    let arrayDailyFlagData = await getStoredArrayDailyFlags();
    console.log("populateFlagNames function is running");
    if (arrayDailyFlagData && Array.isArray(arrayDailyFlagData)) {
      let newArrayFlagNames = arrayDailyFlagData.map((flag) => flags[flag]);
      setArrayFlagNames(newArrayFlagNames); // Update state with new flag names
    } else {
      console.log("No valid arrayDailyFlags found.");
    }
  } catch (error) {
    console.error("Error populating flag names:", error);
  }
};

export { fetchOrGenerateFlags, generateNewFlagsToPopulateArrayDailyFlags };
