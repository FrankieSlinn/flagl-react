import { murmurHash3, generateRandomNumber } from "./randomNumberFromSeed.js";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { flags } from "./countryTerritoryNames";
import { getStoredArrayDailyFlags, storeArrayDailyFlags } from "./asyncStorageUtils.js";

// console.log("newGame in practice and daily", newGame);
let generate_seed
let random_number

const fetchOrGenerateFlags = async (newGame, setNewGame, arrayDailyFlags, setArrayDailyFlags, arrayFlagNames, setArrayFlagNames) => {
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
    console.log("newGame in fetchOrGenerateFlags", newGame);
    console.log("storedFlags", storedFlags);

    // if (storedFlags.length===0 && storedDate === today) {
    //   // Use stored flags if they exist and are from today
    //   console.log("populate arrayDailyFlags based on storedFlags")
    //   setArrayDailyFlags(JSON.parse(storedFlags));
    // } 
    //if game reset
   if (newGame === true) {
    setNewGame(false);
      console.log("newGame is true, now generating new flags to populate arrayDailyFlags")
      generateNewFlagsToPopulateArrayDailyFlags(storedFlags, setArrayDailyFlags, arrayFlagNames, setArrayFlagNames);
      // Generate new flags if it's a new game
      // const newFlags = generateNewFlagsToPopulateArrayDailyFlags(arrayDailyFlags, setArrayDailyFlags, arrayFlagNames, setArrayFlagNames);


  

      // console.log("Generated and stored new flags:", newFlags);
    }
    else{
      console.log("getchorGenerateFlags doesn't fit in if or else")
    }
  } catch (error) {
    console.error("Error fetching or generating flags:", error);
  }
};




const generateNewFlagsToPopulateArrayDailyFlags = async (arrayDailyFlags, setArrayDailyFlags, arrayFlagNames, setArrayFlagNames) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const showStoredArrayDailyFlags= await getStoredArrayDailyFlags();
    console.log("generateNewFlagsToPopulateArrayDailyFlagsRunning");
    console.log("showStoredArrayDailyFlags", showStoredArrayDailyFlags);

    // Update state with a function to ensure the latest state
   
      // console.log("Previous arrayDailyFlags:", prevArrayDailyFlags);

    let newFlags = showStoredArrayDailyFlags
      
      // Generate new flags
      while (newFlags.length < 5) {
        let newFlagItem = Math.abs(Math.floor(random_number() * 225));
        console.log("newFlagItem", newFlagItem);
        
        if (!newFlags.includes(newFlagItem)) {
          newFlags.push(newFlagItem);
        }
      }
      console.log("newFlags generated", newFlags);

      // Store new flags and the current date
      setArrayDailyFlags(newFlags);
      storeArrayDailyFlags(newFlags); 
      console.log("showStoredArrayDailyFlags", showStoredArrayDailyFlags); 
      // AsyncStorage.setItem("arrayDailyFlags", JSON.stringify(newFlags));
      AsyncStorage.setItem("flagGenerationDate", today);

      // Update flag names based on new flags
      populateFlagNames(setArrayFlagNames);
      
      return newFlags;  // Return the new flags to update state
    }

  catch (error) {
    console.error("Error generating new flags:", error);
  
};
}


const populateFlagNames = async (setArrayFlagNames) => {
  try {
    let arrayDailyFlagData = await getStoredArrayDailyFlags();
    console.log("populateFlagNames function is running");

    if (arrayDailyFlagData && Array.isArray(arrayDailyFlagData)) {
      console.log("There is an arrayDailyFlags in populateFlagNames");

      let newArrayFlagNames = arrayDailyFlagData.map((flag) => flags[flag]);

      console.log("newArrayFlagNames", newArrayFlagNames);
      setArrayFlagNames(newArrayFlagNames); // Update state with new flag names
      console.log("Updated arrayFlagNames in populateFlagNames", newArrayFlagNames);
    } else {
      console.log("No valid arrayDailyFlags found.");
    }
  } catch (error) {
    console.error("Error populating flag names:", error);
  }
};



  export{
    fetchOrGenerateFlags,
    generate_seed,
    random_number,
    generateNewFlagsToPopulateArrayDailyFlags
  }