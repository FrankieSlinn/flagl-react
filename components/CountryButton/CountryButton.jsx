import { Text, View, TouchableOpacity, Animated, Keyboard } from "react-native";
import { useEffect, useCallback, useState , useLayoutEffect} from "react";

import { s } from "../../App.style.js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useScreenContext } from "../../utils/helpLastScreen";


export function CountryButton({
  countryMatchingPredText,
  icon,
  setIcon,
  currentFlag,
  country,
  setCountry,
  turns,
  countryUnderscore,
  setCountryUnderscore,
  score,
  setScore,
  setCorrectAnswers,
  haveAnswer,
  setHaveAnswer,
  countryButtonVisible,
  setCountryButtonVisible,
  keyboardOffset,
resultsArray,
setResultsArray, 
validateCorrect,
setValidateCorrect, 
scoreArrayUpdated, 
setScoreArrayUpdated
}) {


  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const { lastScreen, setLastScreen } = useScreenContext();
  const moveScreenBack = useAnimatedStyle(() => {
    return {
      transform: [{ moveYBack: 0}],
    };
  });

//settings for country button display
  const setNewCountryUnderscore = useCallback(
    (country) => {
      if (icon === "") {
        const countryWithUnderscore = country.replaceAll(" ", "_");
        const saveCountryUnderscore = async () => {
          try {
            await AsyncStorage.setItem(
              "countryUnderscore",
              JSON.stringify(countryWithUnderscore)
            );
            console.log("Saved countryUnderscore:", countryWithUnderscore);
          } catch (error) {
            console.error("Error saving country underscore:", error);
          }
        };
        saveCountryUnderscore();
        // Save to async storage and update state if different
        setCountryUnderscore((prev) => {
          if (prev !== countryWithUnderscore) {
        
            return countryWithUnderscore;
          }
          return prev; // Don't update if it's the same value
        });
      }
      
      setScoreArrayUpdated(false)
      setValidateCorrect(false)
      console.log("setValidateCorrect", setValidateCorrect)
    },

    [setCountryUnderscore]
  ); 

  // Effect to compare countryUnderscore with currentFlag after both are updated. Updates score, resultsArray, correctAnswers(for stars )if answer matches result
  useLayoutEffect(() => {
    console.log("useEffect meant to be after countryUnderscore change");
    if (icon === "") {
      if (countryUnderscore != ""&& validateCorrect===false) {

        setHaveAnswer(true);

        if(countryUnderscore !=currentFlag  ){
          setResultsArray((prevResultsArray)=>prevResultsArray.concat("wrong"))
          console.log("countryUnderscore for wrong answer", countryUnderscore, "currentFlag", currentFlag)
          console.log("resultsArray after wrong answer", resultsArray)
          setValidateCorrect(true)
        

        }

        else if (
          countryUnderscore === currentFlag 
      
          
        ) {
          console.log("Correct Answer!!");
          setResultsArray((prevResultsArray)=>prevResultsArray.concat("right"))
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
          setScore((prevScore) => prevScore + 20); 
          console.log("score updated!!!!!", score);
          console.log("resultsArray after right answer", resultsArray)
          setValidateCorrect(true)
         
        }

      }
    }
  }, [countryUnderscore, currentFlag]);

  useEffect(() => {

    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {
    
      console.log(
        "country",
        country,
        "countryUnderscore",
        countryUnderscore,
        "haveAnswer",
        haveAnswer
      );

      if (haveAnswer === true && countryUnderscore !== "" && country !== "") {
        if (turns < 4) {
          if (icon === "") {
            console.log("Setting icon to feedback");
            setIcon("feedback");
          }
        } else if (turns === 4) {
          setIcon("finish");
        }
      }
    }, 0); // Run in the next event loop tick

    return () => clearTimeout(timeout); // Cleanup the timeout when the effect is rerun
  }, [haveAnswer, country, countryUnderscore]);

  // Function to handle button press and update the country state
  function handleButtonPress(selectedCountry) {
    keyboardOffset.value = withSpring(0, {
      damping: 20,
      stiffness: 100,
    });
    if (icon === "") {
 
      Keyboard.dismiss()
     
      setCountry(selectedCountry); // Update country, triggers the useEffect to update countryUnderscore
      setNewCountryUnderscore(selectedCountry);
      setCountryButtonVisible(false);
      
  
      console.log("country in country button after press", country);

      console.log("country after selected by pressing country button", country);
    }
  }

  // Function to map country array to buttons
  function mapCountryArrayToButtons(countryMatchingPredText) {
    if (countryMatchingPredText.length > 0) {
 
      return countryMatchingPredText.map((country, index) => (
    
          countryButtonVisible && (
            <TouchableOpacity
            key={index} 
              style={s.countryButton}
              activeOpacity={0.7}
              onPress={() => handleButtonPress(country)}
            

            >
              <Text style={s.countryButtonText}>{country}</Text>
            </TouchableOpacity>
          )
 
      ));
    
    } else {
      return null;
    }
  }

  return <>
       <View style={s.countryButtonContainer}>
  {mapCountryArrayToButtons(countryMatchingPredText)};
  </View>
  </>
}
