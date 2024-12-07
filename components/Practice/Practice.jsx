import { Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { s } from "../../App.style.js";
import * as allFlagImages from '../../utils/flagMappings.js';
import { flags } from '../../utils/countryTerritoryNames.js';
import { useScreenContext } from '../../utils/helpLastScreen.js';
import { PracticeCountryButton } from "../PracticeCountryButton/PracticeCountryButton.jsx";
import { PracticeHeading } from "../PracticeHeading/PracticeHeading";
import { PracticeInput } from "../PracticeInput/PracticeInput";


import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getStoredGameCount, storeAllScores, storeScore, getAllStoredScores, storeGameCount, getStoredTurns} from '../../utils/asyncStorageUtils.js';

export function Practice({icon, setIcon, currentPracticeFlag, setCurrentPracticeFlag, country, setCountry, turns, setTurns, 
    arrayDailyFlags, setArrayDailyFlags, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore, score, setScore,
    haveAnswer, setHaveAnswer, countryButtonVisible, setCountryButtonVisible, inputValue, setInputValue, countryMatchingPredText, setCountryMatchingPredText,
    practiceCountry, 
    setPracticeCountry,
    practiceCountryUnderscore,
    setPracticeCountryUnderscore, 
    practiceHaveAnswer,
    setPracticeHaveAnswer,
    practiceCountryButtonVisible, 
    setPracticeCountryButtonVisible,
    practiceCountryMatchingPredText,
    setPracticeCountryMatchingPredText,


}){

  console.log("countryButtonVisible in practice", practiceCountryButtonVisible);

  const { lastScreen, setLastScreen } = useScreenContext();


  useEffect(() => {
    setLastScreen("practice")
    console.log("last screen practice", )
    }, []);


  useEffect(() => { randomNumberPractice(); }, []);

  function randomNumberPractice() {
    return Math.abs(Math.floor(Math.random() * (flags.length - 1)));
  }
  useEffect(() => {
    setRandomPracticeFlag();
  }, []);


  function setRandomPracticeFlag() {
    const randomIndex = Math.floor(Math.random() * flags.length);
    const randomFlag = flags[randomIndex];
    const stringRandomFlag=(String(randomFlag));
    setCurrentPracticeFlag(stringRandomFlag);
    console.log("currentPracticeFlag set to:", randomFlag);
    setPracticeCountryUnderscore(stringRandomFlag.replace(" ", "_"));
    console.log("practiceCountryUnderscore", practiceCountryUnderscore)
  }

//go to correct game mode screen determined by turn
  function returnToGameMode() {
    const loadTurns = async () => {
      try {
        const turnCount = await getStoredTurns();
        console.log("turnCount in practice to go back to game mode", turnCount);
        if (turnCount >= 4) {
          setIcon("finish");
        } else {
          setIcon("");
        }
      } catch (error) {
        console.error("Error loading turns", error);
      }
    };
    loadTurns();
  }

  return (
    <>
      <View style={s.mainContent}>
        <PracticeHeading />
        <Text style={s.mainContentText}>
          Which Country or Territory Does this Flag Belong to?
        </Text>

        <View>
          <Image
            source={allFlagImages[practiceCountryUnderscore]}
            style={s.flagImage}
          />
        </View>

        <View>
          <Text style={s.mainContentText}>Type and Select the Name of a Country or Territory</Text>
        </View>

        <View style={s.inputView}>
          <PracticeInput 
          practiceCountryButtonVisible={practiceCountryButtonVisible}
          setPracticeCountryButtonVisible={setPracticeCountryButtonVisible}

            inputValue={inputValue}
            setInputValue={setInputValue}
            countryMatchingPredText={countryMatchingPredText}
            setCountryMatchingPredText={setCountryMatchingPredText}

       
          />
        </View>

        <View>
          <PracticeCountryButton 
            arrayDailyFlags={arrayDailyFlags}
            countryMatchingPredText={countryMatchingPredText}
            setCountryMatchingPredText={setCountryMatchingPredText}
            icon={icon}
            setIcon={setIcon}
            currentPracticeFlag={currentPracticeFlag}
            setCurrentPracticeFlag={setCurrentPracticeFlag}
            practiceCountry={practiceCountry}
            setPracticeCountry={setPracticeCountry}
         
            practiceCountryUnderscore={practiceCountryUnderscore}
            setPracticeCountryUnderscore={setPracticeCountryUnderscore}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
            practiceHaveAnswer={practiceHaveAnswer}
            setPracticeHaveAnswer={setPracticeHaveAnswer}
  practiceCountryButtonVisible={practiceCountryButtonVisible}
  setPracticeCountryButtonVisible={setPracticeCountryButtonVisible}

  />
        </View>

        <TouchableOpacity onPress={returnToGameMode}>
          <Text>Return to Game Mode</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
