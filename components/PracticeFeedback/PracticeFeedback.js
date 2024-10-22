

import {Text, View, Image, TouchableOpacity} from "react-native";
import{useEffect, useState} from "react";
import { s } from "../../App.style.js";
import * as allFlagImages from '../../utils/flagMappings';
import {flags } from '../../utils/countryTerritoryNames';
import  { useScreenContext } from '../../utils/helpLastScreen';
import { StarIcon } from "react-native-heroicons/outline";
import { PracticeHeading} from "../PracticeHeading/PracticeHeading";
import {Input} from "../Input/Input";
import {CountryButton} from "../CountryButton/CountryButton";

export function PracticeFeedback({icon, setIcon,  country, setCountry, 
    arrayDailyFlags, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore, 
  haveAnswer, setHaveAnswer, countryButtonVisible, setCountryButtonVisible, inputValue, setInputValue, countryMatchingPredText, setCountryMatchingPredText,
  currentPracticeFlag,
  setCurrentPracticeFlag
}){

  console.log("Countryundescore in practicefeedback", countryUnderscore, "currentPracticeFlag in practicefeedback", currentPracticeFlag);

  function handleFeedbackButtonPress(){
    setCountry("");
    setHaveAnswer(false)
    setCountryUnderscore("");
    setIcon("practice")
    console.log("icon after have another go pressed", icon)


    // useEffect(() => {



    

    
    // console.log("useEffect to set Haveanswer and countryUnderscore to false at beginning of MAIN SCREEN: setHaveAnswer and setCountryUnderscore", haveAnswer, countryUnderscore)
      
    // }, []);
  }
    return(
        <>
            <View style={s.mainContent}>

      <Text style={s.mainContentText}>Feedback</Text>

      <Text style={s.mainContentText}>
        {countryUnderscore === currentPracticeFlag
          ? `Congratulations. You Are Right. The Answer Is ${
              currentPracticeFlag
            }.`
          : `Unlucky. That Was Not Correct. The Answer Is ${
             currentPracticeFlag
            }.`}
        {"\n"}
      </Text>

  
        <TouchableOpacity
          style={s.countryButton}
          onPress={handleFeedbackButtonPress}
        >
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>

      
              <Text>Practice Feedback</Text>
    </View>
        
        </>
    )
}