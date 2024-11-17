import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { s } from "../../App.style.js";
import { flags } from "../../utils/countryTerritoryNames.js";


export function PracticeCountryButton({
  countryMatchingPredText,
  setCountryMatchingPredText,
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
  console.log(
    "practice country Button visible in country button component",
    practiceCountryButtonVisible
  );

  const setNewPracticeCountryUnderscore = useCallback(
    (practiceCountry) => {
      const practiceCountryWithUnderscore = practiceCountry.replaceAll(
        " ",
        "_"
      );
      setPracticeCountryUnderscore(practiceCountryWithUnderscore);
      console.log(
        "Updated practice countryUnderscore:",
        practiceCountryWithUnderscore
      );

      return practiceCountryWithUnderscore;
    },

    []
  ); 

  const scrollViewRef = useRef(null);


  // Effect to compare countryUnderscore with currentFlag after both are updated
  useEffect(() => {
    console.log(
      "useEffect meant to be after practice countryUnderscore change"
    );
    if (icon === "practice") {
      if (practiceCountryUnderscore != "") {
        console.log(
          "practice useEffect after previous ones triggered",
          practiceCountryUnderscore
        );
        setPracticeHaveAnswer(true);
      }
    }
  }, [practiceCountryUnderscore]);

  useEffect(() => {
    console.log("icon in Country Button", icon);
    // Adding a small timeout to wait for state changes to propagate
    const timeout = setTimeout(() => {
      console.log(
        "practice country",
        practiceCountry,
        "practice countryUnderscore",
        practiceCountryUnderscore,
        "practicehaveAnswer",
        practiceHaveAnswer
      );

      if (
        practiceHaveAnswer === true &&
        practiceCountryUnderscore !== "" &&
        practiceCountry !== ""
      ) {
        if (icon === "practice") {
          // setPracticeCountry(selectedCountry)

          const timeout = setTimeout(() => {
            console.log("Setting icon to feedback practice");
            setIcon("practiceFeedback");
          }, 0);
        }
      }
    }, 0); // Run in the next event loop tick

    return () => clearTimeout(timeout);
  }, [practiceHaveAnswer, practiceCountry, practiceCountryUnderscore]);

  function practiceHandleButtonPress(selectedCountry) {
    if (icon === "practice") {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      setPracticeCountry(selectedCountry); // Update country, triggers the useEffect to update countryUnderscore
      //setNewCountryUnderscore(selectedCountry);
      setPracticeCountryButtonVisible(false);
      console.log(
        "country in practice country button after press",
        practiceCountry
      );
    }
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
            </TouchableOpacity>
          )}
        </View>
      ));
    } else {
      return null;
    }
  }

  return <>{mapCountryArrayToButtons(countryMatchingPredText)}</>;
}
