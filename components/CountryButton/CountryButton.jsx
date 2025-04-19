import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import { useEffect, useCallback,  useLayoutEffect } from "react";

import { s } from "../../App.style.js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { withSpring } from "react-native-reanimated";
// import { useScreenContext } from "../../utils/helpLastScreen";

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
  setScore,
  setCorrectAnswers,
  haveAnswer,
  setHaveAnswer,
  countryButtonVisible,
  setCountryButtonVisible,
  keyboardOffset,
  setResultsArray,
  validateCorrect,
  setValidateCorrect,
  inputValue,
  setScoreArrayUpdated,
}) {

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

      setScoreArrayUpdated(false);
      setValidateCorrect(false);
    },

    [setCountryUnderscore]
  );

  // Effect to compare countryUnderscore with currentFlag after both are updated. Updates score, resultsArray, correctAnswers(for stars )if answer matches result
  useLayoutEffect(() => {
    if (icon === "") {
      if (countryUnderscore != "" && validateCorrect === false) {
        setHaveAnswer(true);
        if (countryUnderscore != currentFlag) {
          setResultsArray((prevResultsArray) =>
            prevResultsArray.concat("wrong")
          );
          setValidateCorrect(true);
        } else if (countryUnderscore === currentFlag) {
          setResultsArray((prevResultsArray) =>
            prevResultsArray.concat("right")
          );
          setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
          setScore((prevScore) => prevScore + 20);
          setValidateCorrect(true);
        }
      }
    }
  }, [countryUnderscore, currentFlag]);

  useEffect(() => {
    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {

      if (haveAnswer === true && countryUnderscore !== "" && country !== "") {
        if (turns < 4) {
          if (icon === "") {
            setIcon("feedback");
          }
        } else if (turns === 4) {
          setIcon("finish");
        }
      }
    }, 0); // Run in the next event loop tick

    return () => clearTimeout(timeout); // Cleanup the timeout when the effect is rerun
  }, [haveAnswer, country, countryUnderscore]);

  // Function to handle button press, move displayand update the country state
  function handleButtonPress(selectedCountry) {
    keyboardOffset.value = withSpring(0, {
      damping: 20,
      stiffness: 100,
    });
    if (icon === "") {
      Keyboard.dismiss();
      setCountry(selectedCountry); // Update country, triggers the useEffect to update countryUnderscore
      setNewCountryUnderscore(selectedCountry);
      setCountryButtonVisible(false);
    }
  }

  // Function to map country array to country buttons
  function mapCountryArrayToButtons(countryMatchingPredText) {
    if (countryMatchingPredText.length > 0) {
      return countryMatchingPredText.map(
        (country, index) =>
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
      );
    } else if (inputValue != "" && countryMatchingPredText.length === 0) {
      return (
        <Text style={[s.mainContentText, { marginTop: -3 }]}>
          No countries found that match this spelling. Try again.{" "}
        </Text>
      );
    }
  }

  return (
    <>
      <View style={s.countryButtonContainer}>
        {mapCountryArrayToButtons(countryMatchingPredText)}
      </View>
    </>
  );
}
