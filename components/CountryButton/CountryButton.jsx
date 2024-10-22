import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { s } from "../../App.style.js";

export function CountryButton({
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
  countryButtonVisible,
  setCountryButtonVisible,
}) {

console.log("country Button visible in country button component", countryButtonVisible)

  const updateCountryUnderscore = useCallback((country) => {
    const countryWithUnderscore = country.replaceAll(" ", "_");
    // Only update if the value is actually different
    setCountryUnderscore((prev) => {
      if (prev !== countryWithUnderscore) {
        console.log("Updated countryUnderscore:", countryWithUnderscore);
        return countryWithUnderscore;
      }
      return prev; // Don't update if it's the same value
    });
  }, []);

  // Effect to update countryUnderscore when country state changes
  useEffect(() => {
    "useEffect meant to be based on country changing";
    if (country) {
      updateCountryUnderscore(country);
    }
  }, [country]);

  // Effect to compare countryUnderscore with currentFlag after both are updated
  useEffect(() => {
    console.log("useEffect meant to be after countryUnderscore change");
    if (countryUnderscore != "" && (icon === ""||icon==="practice")) {
      console.log("useEffect after previous ones triggered", countryUnderscore);
      setHaveAnswer(true);
      // Set the icon to "feedback"

      if (countryUnderscore === currentFlag && countryUnderscore !== ""&& icon==="") {
        console.log("Correct Answer!!!!!!!!!");
        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        setScore((prevScore) => prevScore + 20); // Increase the score by 20
        console.log("score updated", score);
      }
    }
  }, [countryUnderscore]);

  useEffect(() => {
    console.log("icon in Country Button", icon)
    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {
      console.log("turns in country button", turns)
      console.log("country", country, "countryUnderscore", countryUnderscore, "haveAnswer", haveAnswer)
 

      if (haveAnswer === true && countryUnderscore !== "" && country !== "") {

        if(icon==="practice"){

          console.log("Setting icon to feedback practice");
          setIcon("practiceFeedback");

      }
        if(turns<4){
          if(icon===""){
        console.log("Setting icon to feedback");
        setIcon("feedback");}

      }
     else  if(turns===4){
        setIcon("finish")
      }
    }
    }, 0); // Run in the next event loop tick

    return () => clearTimeout(timeout); // Cleanup the timeout when the effect is rerun
  }, [haveAnswer, country, countryUnderscore]);

  // Function to handle button press and update the country state
  function handleButtonPress(selectedCountry) {
    setCountry(selectedCountry); // Update country, triggers the useEffect to update countryUnderscore
    setCountryButtonVisible(false)
 
    console.log("country after selected by pressing country button", country)

  }

  // Function to map country array to buttons
  function mapCountryArrayToButtons(countryMatchingPredText) {
    if (countryMatchingPredText.length > 0) {
      return countryMatchingPredText.map((country, index) => (
        <View key={index} style={s.countryButtonContainer}>
             {countryButtonVisible && (
          <TouchableOpacity
            style={s.countryButton}
            activeOpacity={0.7}
            onPress={() => handleButtonPress(country)}
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
