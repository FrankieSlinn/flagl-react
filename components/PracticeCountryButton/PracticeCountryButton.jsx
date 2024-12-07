import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState, useLayoutEffect } from "react";
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

  //Didn't show Wallis and Futuna - may be fixed
  //Get wrong feedback if multiple words

  const setNewPracticeCountryUnderscore = useCallback(
    (practiceCountry) => {
      console.log("practiceCountry in callback", practiceCountry);
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
 
  // const setNewCountryUnderscore = useCallback(
  //   (country) => {
  //     if (icon === "") {
  //       const countryWithUnderscore = country.replaceAll(" ", "_");
  //       const saveCountryUnderscore = async () => {
  //         try {
  //           await AsyncStorage.setItem(
  //             "countryUnderscore",
  //             JSON.stringify(countryWithUnderscore)
  //           );
  //           console.log("Saved countryUnderscore:", countryWithUnderscore);
  //         } catch (error) {
  //           console.error("Error saving country underscore:", error);
  //         }
  //       };
  //       saveCountryUnderscore();
  //       // Save to async storage and update state if different
  //       setCountryUnderscore((prev) => {
  //         if (prev !== countryWithUnderscore) {
  //           console.log("Updated countryUnderscore:", countryWithUnderscore);

  //           return countryWithUnderscore;
  //         }
  //         return prev; // Don't update if it's the same value
  //       });
  //     }
  //   },

  //   [setCountryUnderscore]
  // ); // Add dependencies, such as setCountryUnderscore if it's from props or state



  // Effect to compare countryUnderscore with currentFlag after both are updated
  useLayoutEffect(() => {
    console.log(
      "useLayoutEffect meant to be after practice countryUnderscore change"
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



  // useLayoutEffect(() => {
  //   console.log("useEffect meant to be after countryUnderscore change");
  //   if (icon === "") {
  //     if (countryUnderscore != "") {
  //       console.log(
  //         "useEffect after previous ones triggered",
  //         countryUnderscore
  //       );
  //       setHaveAnswer(true);
  //       // Set the icon to "feedback"

  //       if (
  //         countryUnderscore === currentFlag &&
  //         countryUnderscore !== "" &&
  //         icon === ""
  //       ) {
  //         console.log("Correct Answer!!!!!!!!!");
  //         setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
  //         setScore((prevScore) => prevScore + 20); // Increase the score by 20
  //         console.log("score updated", score);
  //       }
  //     }
  //   }
  // }, [countryUnderscore]);

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

  function practiceHandleButtonPress(selectedPracticeCountry) {
    if (icon === "practice") {
     // scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      setPracticeCountry(selectedPracticeCountry); // Update country, triggers the useEffect to update countryUnderscore
      //setNewCountryUnderscore(selectedCountry);
      setPracticeCountryButtonVisible(false);
      console.log(
        "country in practice country button after press",
        practiceCountry
      );
      setNewPracticeCountryUnderscore(selectedPracticeCountry);
    }
  }

  // function handleButtonPress(selectedCountry) {
  //   keyboardOffset.value = withSpring(0, {
  //     damping: 20,
  //     stiffness: 100,
  //   });
  //   if (icon === "") {
 
  //     Keyboard.dismiss()
     
  //     setCountry(selectedCountry); // Update country, triggers the useEffect to update countryUnderscore
  //     setNewCountryUnderscore(selectedCountry);
  //     setCountryButtonVisible(false);
      
  
  //     console.log("country in country button after press", country);

  //     console.log("country after selected by pressing country button", country);
  //   }
  // }

  // Function to map country array to buttons
  function mapPracticeCountryArrayToButtons(countryMatchingPredText) {
    if (countryMatchingPredText.length > 0) {
      return countryMatchingPredText.map((country, index) => (
    
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
   
      ));
    } else {
      return null;
    }
  }
 
  return <>
   <View style={s.countryButtonContainer}>
  {mapPracticeCountryArrayToButtons(countryMatchingPredText)}
  </View>
  </>;
}


// function mapCountryArrayToButtons(countryMatchingPredText) {
//   if (countryMatchingPredText.length > 0) {

//     return countryMatchingPredText.map((country, index) => (
  
//         countryButtonVisible && (
//           <TouchableOpacity
//           key={index} 
//             style={s.countryButton}
//             activeOpacity={0.7}
//             onPress={() => handleButtonPress(country)}
          

//           >
//             <Text style={s.countryButtonText}>{country}</Text>
//           </TouchableOpacity>
//         )

//     ));
  
//   } else {
//     return null;
//   }
// }

// return <>
//      <View style={s.countryButtonContainer}>
// {mapCountryArrayToButtons(countryMatchingPredText)};
// </View>
// </>

