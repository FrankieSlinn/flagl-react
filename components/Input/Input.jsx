import { TextInput, View, Text } from "react-native";
import { s } from "../../App.style.js";
import { flags } from "../../utils/countryTerritoryNames.js";

export function Input({
  setCountryButtonVisible,
  setInputValue,
  setCountryMatchingPredText,
}) {
  function populateCountryArray(inputValue) {
    //reset array of flag names to be populated on buttons
    let arrayFlagNames = [];
    let lowerCaseInput = String(inputValue).toLowerCase();
    let inputLength = lowerCaseInput.length;
    setCountryButtonVisible(inputValue.length > 0);
    //create array of flag names based on user input
    for (let i = 0; i < flags.length; i++) {
      if (lowerCaseInput === flags[i].substring(0, inputLength).toLowerCase()) {
        arrayFlagNames.push(flags[i]);
      }
    }
    arrayFlagNames.sort();
    // Slice the array to keep only the first 5 elements to be shown in buttons
    if (arrayFlagNames.length > 5) {
      arrayFlagNames = arrayFlagNames.slice(0, 5);
    }
    // Set the reduced array into state
    setCountryMatchingPredText(arrayFlagNames);
  }

  return (
    <>
      <View style={s.inputContainer}>
   
          <TextInput
            style={s.inputText}
            placeholder="Type and buttons will appear"
            autoCorrect={false} // Disables autocorrect
            autoComplete="one-time-code"
            textContentType="none"
            keyboardType="visible-password"
            spellCheck={false}
            onChangeText={(text) => {
              setInputValue(text);
              populateCountryArray(text);
            }}
          />
 
      </View>
    </>
  );
}
