import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { s } from "../../App.style.js";
import { flags } from "../../utils/countryTerritoryNames.js";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import  { useScreenContext }from '../../utils/helpLastScreen.js';
import { getStoredGameCount, storeAllScores, storeScore, getAllStoredScores, storeGameCount, storeTurns, getStoredTurns,
  getStoredCountryunderscore, storeCountryunderscore
} from '../../utils/asyncStorageUtils.js';

export function PracticeCountryButton({
  countryMatchingPredText,
  setCountryMatchingPredText,
  icon,
  setIcon,
  currentFlag,
  setCurrentFlag,
  currentPracticeFlag,
  setCurrentPracticeFlag,
  country,
  setCountry,
  turns,
  setTurns,
  countryUnderscore,
  setCountryUnderscore,
  arrayDailyFlags,
  score,
  setScore,
  correctAnswers,
  setCorrectAnswers,
  haveAnswer,
  setHaveAnswer,
  practiceHaveAnswer,
  setPracticeHaveAnswer,
  practiceCountryButtonVisible,
  setPracticeCountryButtonVisible,
  practiceCountry, 
  setPracticeCountry,
  practiceCountryUnderscore,
  setPracticeCountryUnderscore
}) {

console.log("practice country Button visible in country button component", practiceCountryButtonVisible)


  // const updateCountryUnderscore = useCallback((country) => {
  //   const countryWithUnderscore = country.replaceAll(" ", "_");

    
  //   // Only update if the value is actually different
  //   setCountryUnderscore((prev) => {
  //     if (prev !== countryWithUnderscore) {
  //       console.log("Updated countryUnderscore:", countryWithUnderscore);
  //       return countryWithUnderscore;
  //     }
  //     return prev; // Don't update if it's the same value
  //   });
  // }, []);

  // // Effect to update countryUnderscore when country state changes
  // useEffect(() => {
  //   "useEffect meant to be based on country changing";
  //   if (country) {
  //     updateCountryUnderscore(country);
  //   }
  // }, [country]);

  //To ensure countryUnderscore stays the same when switch from practice to game mode
  const setNewPracticeCountryUnderscore= useCallback((practiceCountry) => {
    


      const practiceCountryWithUnderscore = practiceCountry.replaceAll(" ", "_");
      setPracticeCountryUnderscore(practiceCountryWithUnderscore) 
          console.log("Updated practice countryUnderscore:", practiceCountryWithUnderscore);
        
          return practiceCountryWithUnderscore;
        
  
      }


  , []); // Add dependencies, such as setCountryUnderscore if it's from props or state
  
// updateCountryUnderscore();

  // Effect to compare countryUnderscore with currentFlag after both are updated
  useEffect(() => {
    console.log("useEffect meant to be after practice countryUnderscore change");
    if(icon==="practice"){
    if (practiceCountryUnderscore != "" ) {
      console.log("practice useEffect after previous ones triggered", practiceCountryUnderscore);
      setPracticeHaveAnswer(true);
   

    }}
  }, [practiceCountryUnderscore]);

  useEffect(() => {
    console.log("icon in Country Button", icon)
    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {


      console.log("practice country", practiceCountry, "practice countryUnderscore", practiceCountryUnderscore, "practicehaveAnswer", practiceHaveAnswer)
 

      if (practiceHaveAnswer === true && practiceCountryUnderscore !== "" && practiceCountry !== "") {

        if(icon==="practice"){
           // setPracticeCountry(selectedCountry)
         
         
            const timeout = setTimeout(() => {
            console.log("Setting icon to feedback practice");
            setIcon("practiceFeedback")},0)

      }
    }
    }, 0); // Run in the next event loop tick

    return () => clearTimeout(timeout); 
  

  }, [practiceHaveAnswer, practiceCountry, practiceCountryUnderscore]);


  function practiceHandleButtonPress(selectedCountry) {
    if(icon==="practice"){
    setPracticeCountry(selectedCountry); // Update country, triggers the useEffect to update countryUnderscore
    //setNewCountryUnderscore(selectedCountry);
    setPracticeCountryButtonVisible(false)
    console.log("country in country button after press", country)
    
 
    console.log("country after selected by pressing country button", country)}



  }
    


  

  

  // Function to map country array to buttons
  function mapCountryArrayToButtons(countryMatchingPredText) {
    if (countryMatchingPredText.length > 0) {
      return countryMatchingPredText.map((country, index) => (
        <View key={index} style={s.countryButtonContainer}>
             {practiceCountryButtonVisible && (
          <TouchableOpacity
            style={s.countryButton}
            activeOpacity={0.7}
            onPress={() => practiceHandleButtonPress(country)}
          >
            <Text style={s.countryButtonText}>{country}</Text>
          </TouchableOpacity>)}
        </View>
      ));
    } else {
      return null;
    }
  }

  return <>{mapCountryArrayToButtons(countryMatchingPredText)}</>;
}
