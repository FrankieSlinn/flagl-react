

import {Text, View, Image, TouchableOpacity} from "react-native";
import { s } from "../../App.style.js";
import * as allFlagImages from '../../utils/flagMappings';
import {flags } from '../../utils/countryTerritoryNames';
import  { useScreenContext } from '../../utils/helpLastScreen';
import { StarIcon } from "react-native-heroicons/outline";
import { PracticeHeading} from "../PracticeHeading/PracticeHeading";
import {Input} from "../Input/Input";
import {CountryButton} from "../CountryButton/CountryButton";

export function Practice({icon, setIcon, currentFlag, setCurrentFlag, country, setCountry, turns, setTurns, 
    arrayDailyFlags, setArrayDailyFlags, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore, score, setScore,
  haveAnswer, setHaveAnswer, countryButtonVisible, setCountryButtonVisible, inputValue, setInputValue, countryMatchingPredText, setCountryMatchingPredText,
}){


return(
<>
<View style={s.mainContent} >

    <PracticeHeading/>
<Text style={s.mainContentText}>
        Which Country or Territory Does this Flag Belong to?
      </Text>

      <View>
        {currentFlag && allFlagImages[currentFlag] ? (
          <Image
            source={allFlagImages[currentFlag]}
            style={s.flagImage}
          />
        ) : (
          <Text >Loading...</Text> // Show a loading message if currentFlag is not available
        )}
      </View>
      <View>
        <Text style={s.mainContentText}>Type and Select the Name of a Country or Territory</Text>
      </View>
        <View style={s.inputView}>
        <Input 
        countryButtonVisible={countryButtonVisible}
        setCountryButtonVisible={setCountryButtonVisible}
        inputValue={inputValue}
        setInputValue={setInputValue}
        countryMatchingPredText={countryMatchingPredText}
        setCountryMatchingPredText={setCountryMatchingPredText}
        score={score}
        setScore={setScore}
        />
        </View >

          <View>
            <CountryButton 
            arrayDailyFlags={arrayDailyFlags}
            countryMatchingPredText={countryMatchingPredText}
            setCountryMatchingPredText={setCountryMatchingPredText}
            icon={icon}
            setIcon={setIcon}
            currentFlag={currentFlag}
            setCurrentFlag={setCurrentFlag}
            country={country}
            setCountry={setCountry}
            turns = {turns}
            setTurns = {setTurns}
            countryUnderscore = {countryUnderscore}
            setCountryUnderscore={setCountryUnderscore}
            score = {score}
            setScore={setScore}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
            haveAnswer={haveAnswer}
            setHaveAnswer={setHaveAnswer}
            />

          </View>
        


<Text >FLAGL Practice</Text>

</View>
</>
)

}