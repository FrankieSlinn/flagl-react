import { TextInput, View, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Animated} from "react-native";
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
    console.log("countrybutton visible", countryButtonVisible);

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
    console.log("matching flag Names in array for pred text", arrayFlagNames);

    // Slice the array to keep only the first 5 elements
    if (arrayFlagNames.length > 5) {
      arrayFlagNames = arrayFlagNames.slice(0, 5);
    }

    // Set the reduced array into state
    setCountryMatchingPredText(arrayFlagNames);

    console.log("matching flag Names reduced to 5", arrayFlagNames);
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
         

            console.log(
              "in input check which icon //is country button visible?",
              icon,
              countryButtonVisible, 
              inputValue
            );
            console.log(
              "in putValue.length", inputValue.length)
          
       

            populateCountryArray(text);
          }}
        />


    
    </View>
    

    </>
  );
}
