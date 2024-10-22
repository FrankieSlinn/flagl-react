

import {Text, View, Image, TouchableOpacity} from "react-native";
import { s } from "../../App.style.js";
import * as allFlagImages from '../../utils/flagMappings';
import {flags } from '../../utils/countryTerritoryNames';
import  { useScreenContext } from '../../utils/helpLastScreen';
import { StarIcon } from "react-native-heroicons/outline";
import { PracticeHeading} from "../PracticeHeading/PracticeHeading";
import {Input} from "../Input/Input";
import {CountryButton} from "../CountryButton/CountryButton";

export function PracticeFeedback({icon, setIcon, currentFlag, setCurrentFlag, country, setCountry, 
    arrayDailyFlags, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore, 
  haveAnswer, setHaveAnswer, countryButtonVisible, setCountryButtonVisible, inputValue, setInputValue, countryMatchingPredText, setCountryMatchingPredText,
}){

  function handleFeedbackButtonPress(){
    setIcon("practice")
  }
    return(
        <>
            <View style={s.mainContent} backgroundColor="">

      <Text style={s.mainContentText}>Feedback</Text>

      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${
              country
            }.`
          : `Unlucky. That Was Not Correct. The Answer Is ${
             country
            }.`}
        {"\n"}
      </Text>

  
        <TouchableOpacity
          style={s.countryButton}
          onPress={handleFeedbackButtonPress}
        >
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>

      
              <Text>Feedback</Text>
    </View>
        
        </>
    )
}