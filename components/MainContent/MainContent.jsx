import { s } from "../../App.style.js";
import { Text, Image, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Stars } from "../Stars/Stars";
import { Input } from "../Input/Input";
import { CountryButton } from "../CountryButton/CountryButton";
import {
  generateNewFlagsToPopulateArrayDailyFlags,
} from "../../utils/practiceAndDaily.js";
import * as allFlagImages from '../../utils/flagMappings';
import {flags } from '../../utils/countryTerritoryNames';

export function MainContent({icon, setIcon, currentFlag, setCurrentFlag, country, setCountry, turns, setTurns, 
  arrayDailyFlags, setArrayDailyFlags, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore, score, setScore,
haveAnswer, setHaveAnswer}) {
  let arrayFlagNames = []


  const[countryButtonVisible, setCountryButtonVisible] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const[countryMatchingPredText, setCountryMatchingPredText]=useState([])

   let currentFlagNumber ;

  arrayDailyFlags.forEach((flag, index) => {
    arrayFlagNames.push(flags[flag]);
   
  });
 // set below variables to ensure that feedback screen not shown until country button pressed

 useEffect(() => {

  console.log("score in main", score)

setCountry("");
setHaveAnswer(false)
setCountryUnderscore("");

console.log("useEffect to set Haveanswer and countryUnderscore to false at beginning of MAIN SCREEN: setHaveAnswer and setCountryUnderscore", haveAnswer, countryUnderscore)
}, []); // Empty dependency array means this runs only once on mount


useEffect(() => {

if(turns===0 && countryUnderscore==="")
{setScore(0)}


console.log("useEffect to set Haveanswer and countryUnderscore to false at beginning of MAIN SCREEN: setHaveAnswer and setCountryUnderscore", haveAnswer, countryUnderscore)
}, [countryUnderscore]);

  
  // Function to fetch or generate new flags based on the date
  const fetchOrGenerateFlags = async () => {
    try {
      const storedFlags = await AsyncStorage.getItem('arrayDailyFlags'); // Retrieve stored flags
      const storedDate = await AsyncStorage.getItem('flagGenerationDate'); // Retrieve the stored generation date
  
      const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  
      if (storedFlags !== null && storedDate === today) {
        // If flags exist and were generated today, use them
        setArrayDailyFlags(JSON.parse(storedFlags));
       // console.log("Flags loaded from storage:", JSON.parse(storedFlags));
      } else {
        // If no flags are stored or it's a new day, generate new flags
        const newFlags = generateNewFlagsToPopulateArrayDailyFlags();
        setArrayDailyFlags(newFlags);
  
        // Store new flags and the current date
        await AsyncStorage.setItem('arrayDailyFlags', JSON.stringify(newFlags));
        await AsyncStorage.setItem('flagGenerationDate', today);
  
        console.log("Generated and stored new flags:", newFlags);
      }
    } catch (error) {
      console.error('Error fetching or generating flags:', error);
    }
  };
  
  useEffect(() => {
    fetchOrGenerateFlags(); 
    // Fetch or generate flags only once when the component mounts
  }, []);
  

  useEffect(() => {
    setHaveAnswer(false);
  
    setCountryUnderscore("");
    // Update current flag when arrayDailyFlags or turns change
    let currentFlagNumber = arrayDailyFlags[turns]
   // console.log("arrayDailyFlags[turns]", arrayDailyFlags[turns])
   console.log("flag name", flags[arrayDailyFlags[turns]])
 
   // console.log("currentFlagNumber", currentFlagNumber);
    //console.log("flags, flags")
    if (arrayDailyFlags.length > 0) {
   
      let flagWithoutUnderscore = String(flags[currentFlagNumber]);
      //let flagWithoutUnderscore = flags[currentFlag];
      
      let flagWithUnderscore = flagWithoutUnderscore.replaceAll(" ", "_");
     // console.log("flagWithUnderscore", flagWithUnderscore)
     console.log("turns in main", turns)
      setCurrentFlag(flagWithUnderscore);
      console.log("current Flag in useEffect", currentFlag)
      
    }
  }, [arrayDailyFlags, turns]);

 // console.log("allFlagImages[currentFlag]", allFlagImages[currentFlag])

  return (
    <>

      <View style={s.mainContent}>

      <Stars 
      correctAnswers={correctAnswers}
     setCorrectAnswers={setCorrectAnswers}
     />
      <Text style={s.mainContentText}>
        Which Country or Territory Does this Flag Belong to?
      </Text>

      <View>
        {currentFlag && allFlagImages[currentFlag] ? (
          <Image
            source={allFlagImages[currentFlag]}
            style={s.flagImage}
          />
        ) : (
          <Text >Loading...</Text> // Show a loading message if currentFlag is not available
        )}
      </View>
      <View>
        <Text style={s.mainContentText}>Type and Select the Name of a Country or Territory</Text>
      </View>
        <View style={s.inputView}>
        <Input 
        countryButtonVisible={countryButtonVisible}
        setCountryButtonVisible={setCountryButtonVisible}
        inputValue={inputValue}
        setInputValue={setInputValue}
        countryMatchingPredText={countryMatchingPredText}
        setCountryMatchingPredText={setCountryMatchingPredText}
        score={score}
        setScore={setScore}
        />
        </View >

          <View>
            <CountryButton 
            arrayDailyFlags={arrayDailyFlags}
            countryMatchingPredText={countryMatchingPredText}
            setCountryMatchingPredText={setCountryMatchingPredText}
            icon={icon}
            setIcon={setIcon}
            currentFlag={currentFlag}
            setCurrentFlag={setCurrentFlag}
            country={country}
            setCountry={setCountry}
            turns = {turns}
            setTurns = {setTurns}
            countryUnderscore = {countryUnderscore}
            setCountryUnderscore={setCountryUnderscore}
            score = {score}
            setScore={setScore}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
            haveAnswer={haveAnswer}
            setHaveAnswer={setHaveAnswer}
            />

          </View>
        
      </View>
    </>
  );
}
