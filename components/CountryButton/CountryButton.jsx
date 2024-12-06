import { Text, View, TouchableOpacity, Animated, Keyboard } from "react-native";
import { useEffect, useCallback, useState , useLayoutEffect} from "react";
//import { useShared } from '../../SharedContext';
import { s } from "../../App.style.js";
import { flags } from "../../utils/countryTerritoryNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useScreenContext } from "../../utils/helpLastScreen";
import {
  getStoredGameCount,
  storeAllScores,
  storeScore,
  getAllStoredScores,
  storeGameCount,
  storeTurns,
  getStoredTurns,
  getStoredCountryunderscore,
  storeCountryunderscore,
} from "../../utils/asyncStorageUtils";

export function CountryButton({
  countryMatchingPredText,
  setCountryMatchingPredText,
  icon,
  setIcon,
  currentFlag,
  setCurrentFlag,

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

  countryButtonVisible,
  setCountryButtonVisible,
  scrollViewRef,
  keyboardOffset,
  translateY,
}) {
  console.log(
    "country Button visible in country button component",
    countryButtonVisible
  );

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const moveScreenBack = useAnimatedStyle(() => {
    return {
      transform: [{ moveYBack: 0}],
    };
  });



  // const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {

  // });



  //To ensure countryUnderscore stays the same when switch from practice to game mode
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
            console.log("Updated countryUnderscore:", countryWithUnderscore);

            return countryWithUnderscore;
          }
          return prev; // Don't update if it's the same value
        });
      }
    },

    [setCountryUnderscore]
  ); // Add dependencies, such as setCountryUnderscore if it's from props or state

  // Effect to compare countryUnderscore with currentFlag after both are updated
  useLayoutEffect(() => {
    console.log("useEffect meant to be after countryUnderscore change");
    if (icon === "") {
      if (countryUnderscore != "") {
        console.log(
          "useEffect after previous ones triggered",
          countryUnderscore
        );
        setHaveAnswer(true);
        // Set the icon to "feedback"

        if (
          countryUnderscore === currentFlag &&
          countryUnderscore !== "" &&
          icon === ""
        ) {
          console.log("Correct Answer!!!!!!!!!");
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
          setScore((prevScore) => prevScore + 20); // Increase the score by 20
          console.log("score updated", score);
        }
      }
    }
  }, [countryUnderscore]);

  useEffect(() => {
    console.log("icon in Country Button", icon);
    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {
      console.log("turns in country button", turns);
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
