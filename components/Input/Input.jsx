import { TextInput, View, Text} from "react-native";
   // import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useEffect, useRef, useState} from "react";
import { s } from "../../App.style.js";

import { flags } from "../../utils/countryTerritoryNames.js";

export function Input({
  countryButtonVisible,
  setCountryButtonVisible,
  inputValue,
  setInputValue,
  setCountryMatchingPredText,
  icon,

}) {



  function populateCountryArray(inputValue) {
  

    let arrayFlagNames = [];
    let lowerCaseInput = String(inputValue).toLowerCase();

    let inputLength = lowerCaseInput.length;
    setCountryButtonVisible(inputValue.length > 0);

    console.log("inputLength", inputLength);
    for (let i = 0; i < flags.length; i++) {
      if (lowerCaseInput === flags[i].substring(0, inputLength).toLowerCase()) {
        arrayFlagNames.push(flags[i]);
      }
    }
 

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
        <Text>
   
   
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
         

         
            console.log(
              "in putValue.length", inputValue.length)
          
       

            populateCountryArray(text);
          }}
        />
        </Text>


    
    </View>
    

    </>
  );
}
