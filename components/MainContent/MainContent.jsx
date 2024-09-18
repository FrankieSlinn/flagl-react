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

export function MainContent() {
  const [turns, setTurns] = useState(0);
  const [arrayDailyFlags, setArrayDailyFlags] = useState([]);
  const [currentFlag, setCurrentFlag] = useState(null);
  const[countryButtonVisible, setCountryButtonVisible] = useState(false)
  const [inputValue, setInputValue] = useState("");

  // Generate flags on component mount using useEffect
  useEffect(() => {
    const newFlags = generateNewFlagsToPopulateArrayDailyFlags();
    setArrayDailyFlags(newFlags);
    console.log("New flags generated:", newFlags); // Log the new flags
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
      {console.log("Current flag:", currentFlag)}
      {console.log("ArrayDailyFlags:", arrayDailyFlags)}
      {console.log("Flag image source:", allFlagImages[`${currentFlag}`])}
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
        setInputValue={setInputValue}/>
        </View >
        {countryButtonVisible && (
          <View>
            <CountryButton visible={countryButtonVisible} />
          </View>
        )}
      </View>
    </>
  );
}
