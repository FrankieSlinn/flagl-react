import { s } from "../../App.style.js";
import { Text, Image, View } from "react-native";
import { useState, useEffect } from "react";
import { Stars } from "../Stars/Stars";
import { Input } from "../Input/Input";
import { CountryButton } from "../CountryButton/CountryButton";
import {
  generateNewFlagsToPopulateArrayDailyFlags,
} from "../../utils/practiceAndDaily.js";
import * as allFlagImages from '../../utils/flagMappings';
import {flags } from '../../utils/countryTerritoryNames';

export function MainContent({icon, setIcon, currentFlag, setCurrentFlag, country, setCountry}) {
  const [turns, setTurns] = useState(0);
  const [arrayDailyFlags, setArrayDailyFlags] = useState([]);

  const[countryButtonVisible, setCountryButtonVisible] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const[countryMatchingPredText, setCountryMatchingPredText]=useState([])

  // Generate flags on component mount using useEffect
  useEffect(() => {
    const newFlags = generateNewFlagsToPopulateArrayDailyFlags();
    setArrayDailyFlags(newFlags);
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Update current flag when arrayDailyFlags or turns change
    console.log("arrayDailyFlags[turns]", arrayDailyFlags[turns])
    let currentFlagNumber = arrayDailyFlags[turns];
    console.log("currentFlagNumber", currentFlagNumber);
    console.log("flags, flags")
    if (arrayDailyFlags.length > 0) {
      setCurrentFlag(flags[currentFlagNumber]);
      console.log("current Flag in useEffect", currentFlag)
      
    }
  }, [arrayDailyFlags, turns, currentFlag]);

  return (
    <>

      <View style={s.mainContent}>

      <Stars />
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
        />
        </View >

          <View>
            <CountryButton 
            countryMatchingPredText={countryMatchingPredText}
            setCountryMatchingPredText={setCountryMatchingPredText}
            icon={icon}
            setIcon={setIcon}
            currentFlag={currentFlag}
            setcurrentFlag={setCurrentFlag}
            country={country}
            setCountry={setCountry}
            
            />

          </View>
        
      </View>
    </>
  );
}
