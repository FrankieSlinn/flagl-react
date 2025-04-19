import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState, useLayoutEffect } from "react";
import { s } from "../../App.style.js";

export function PracticeCountryButton({
  countryMatchingPredText,
  icon,
  setIcon,
  practiceHaveAnswer,
  setPracticeHaveAnswer,
  practiceCountryButtonVisible,
  setPracticeCountryButtonVisible,
  practiceCountry,
  setPracticeCountry,
  practiceCountryUnderscore,
  setPracticeCountryUnderscore,
}) {
  const setNewPracticeCountryUnderscore = useCallback(
    (practiceCountry) => {
      const practiceCountryWithUnderscore = practiceCountry.replaceAll(
        " ",
        "_"
      );
      setPracticeCountryUnderscore(practiceCountryWithUnderscore);
      return practiceCountryWithUnderscore;
    },

    []
  );

  // Effect to compare countryUnderscore with currentFlag after both are updated
  useLayoutEffect(() => {
    if (icon === "practice") {
      if (practiceCountryUnderscore != "") {
        setPracticeHaveAnswer(true);
      }
    }
  }, [practiceCountryUnderscore]);

  useEffect(() => {
    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {
      if (
        practiceHaveAnswer === true &&
        practiceCountryUnderscore !== "" &&
        practiceCountry !== ""
      ) {
        if (icon === "practice") {
          const timeout = setTimeout(() => {
            setIcon("practiceFeedback");
          }, 0);
        }
      }
    }, 0); // Run in the next event loop tick

    return () => clearTimeout(timeout);
  }, [practiceHaveAnswer, practiceCountry, practiceCountryUnderscore]);

  function practiceHandleButtonPress(selectedPracticeCountry) {
    if (icon === "practice") {
      setPracticeCountry(selectedPracticeCountry); // Update country, triggers the useEffect to update countryUnderscore to
      //get into format where can validate
      //The country button should no longer be visible.
      setPracticeCountryButtonVisible(false);
      setNewPracticeCountryUnderscore(selectedPracticeCountry);
    }
  }

  // Function to map country array to buttons
  function mapPracticeCountryArrayToButtons(countryMatchingPredText) {
    if (countryMatchingPredText.length > 0) {
      return countryMatchingPredText.map(
        (country, index) =>
          practiceCountryButtonVisible && (
            <TouchableOpacity
              key={index}
              style={s.countryButton}
              activeOpacity={0.7}
              onPress={() => practiceHandleButtonPress(country)}
            >
              <Text style={s.countryButtonText}>{country}</Text>
            </TouchableOpacity>
          )
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <View style={s.countryButtonContainer}>
        {mapPracticeCountryArrayToButtons(countryMatchingPredText)}
      </View>
    </>
  );
}
