import { murmurHash3, generateRandomNumber } from "./randomNumberFromSeed.js";
let fullDate = new Date();
//Today's date split into three values
let year = String(fullDate.getFullYear());
let month = String(fullDate.getMonth() + 1);
let day = String(fullDate.getDate());
//number based on current date which is used as dateInputForSeed
let dateNumberSeed = day + month + year;


let generate_seed = murmurHash3(dateNumberSeed);
let random_number = generateRandomNumber(generate_seed(), generate_seed());


function generateNewFlagsToPopulateArrayDailyFlags() {
    let arrayDailyFlags = [];
    while (arrayDailyFlags.length < 5) {
      let newFlagItem = Math.abs(Math.floor(random_number() * 225));
      if (!arrayDailyFlags.includes(newFlagItem)) {
        arrayDailyFlags.push(newFlagItem);
      }
    }
    return arrayDailyFlags; // Return the array
  }

  export{
    generate_seed,
    random_number,
    generateNewFlagsToPopulateArrayDailyFlags
  }