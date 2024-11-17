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

  // const [keyboardHeight] = useState(new Animated.Value(0));

  // const scrollViewRef = useRef(null);


  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
  //     Animated.timing(keyboardHeight, {
  //       toValue: -event.endCoordinates.height +200, // Move up by keyboard height
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   });

  //   const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
  //     Animated.timing(keyboardHeight, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   });

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     //keyboardDidHideListener.remove();
  //   };
  // }, []);

  function populateCountryArray(inputValue) {
    console.log("countrybutton visible", countryButtonVisible);

    let arrayFlagNames = [];
    let lowerCaseInput = String(inputValue).toLowerCase();

    let inputLength = lowerCaseInput.length;
    setCountryButtonVisible(inputValue.length > 0);

    console.log("inputLength", inputLength);
    for (i = 0; i < flags.length; i++) {
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

//   const handleInputFocus = () => {
//     scrollViewRef.current?.scrollTo({ y: -200, animated: true }); // Adjust `y` to the position you want
//   };

// useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
//       scrollViewRef.current?.scrollTo({ y: 100, animated: true }); // Adjust `y` as needed
//     });

//     const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
//       scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     });

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, [scrollViewRef]);



  return (
    <>


      <View style={s.inputContainer}>
   
   
        <TextInput
              // onFocus={() => {
              //   scrollViewRef.current?.scrollTo({ y: -150, animated: true });
              // }}
          style={s.inputText}
          placeholder="Type and buttons will appear"
          autoCorrect={false} // Disables autocorrect
          autoComplete="one-time-code"
          //onSubmitEditing={()=> Keyboard.dismiss()}
          //secureTextEntry={true} //this worked for no suggestions but doesn't show letters
          textContentType="none"
          keyboardType="visible-password"
          spellCheck={false}
          onChangeText={(text) => {
            setInputValue(text);
           // setCountryButtonVisible(inputValue.length > 0);

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
