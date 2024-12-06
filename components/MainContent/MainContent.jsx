import { s } from "../../App.style.js";
import { Text, Image, View, KeyboardAvoidingView, ScrollView, Animated, Keyboard, LayoutAnimation, Platform, UIManager, Dimensions} from "react-native";
import { useState, useEffect, useContext , useRef} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stars } from "../Stars/Stars";
import { Input } from "../Input/Input";
import { CountryButton } from "../CountryButton/CountryButton";
import { generateNewFlagsToPopulateArrayDailyFlags } from "../../utils/practiceAndDaily.js";
import * as allFlagImages from "../../utils/flagMappings";
import { flags } from "../../utils/countryTerritoryNames";
import { useScreenContext } from "../../utils/helpLastScreen";

import {
  getStoredGameCount,
  storeTurns,
  getStoredTurns,
} from "../../utils/asyncStorageUtils";

export function MainContent({
  icon,
  setIcon,
  currentFlag,
  setCurrentFlag,
  country,
  setCountry,
  turns,
  setTurns,
  arrayDailyFlags,
  setArrayDailyFlags,
  correctAnswers,
  setCorrectAnswers,
  countryUnderscore,
  setCountryUnderscore,
  score,
  setScore,
  haveAnswer,
  setHaveAnswer,
  countryMatchingPredText,
  setCountryMatchingPredText,
  inputValue,
  setInputValue,
  countryButtonVisible,
  setCountryButtonVisible,
  practiceCountry,
  setPracticeCountry,
  practiceCountryUnderscore,
  setPracticeCountryUnderscore,
  practiceHaveAnswer,
  setPracticeHaveAnswer,
  practiceCountryButtonVisible,
  setPracticeCountryButtonVisible,
  keyboardOffset

}) {
  let arrayFlagNames = [];

  const { lastScreen, setLastScreen } = useScreenContext();


  const [keyboardHeight] = useState(new Animated.Value(0));

  const scrollViewRef = useRef(null);

 

  let currentFlagNumber;

  arrayDailyFlags.forEach((flag, index) => {
    arrayFlagNames.push(flags[flag]);
  });

  useEffect(() => {
    setLastScreen("");
    console.log("last screen main");
  }, []);

  // Store the updated turns in AsyncStorage whenever it changes
  useEffect(() => {
    const storeTurnsInAsyncStorage = async () => {
      try {
        const turnsStored = await AsyncStorage.setItem(
          "turns",
          JSON.stringify(turns)
        );
        console.log("Turns stored in AsyncStorage: in main", turnsStored);
      } catch (error) {
        console.error("Error storing turns in AsyncStorage:", error);
      }
    };
    if (turns !== null) {
      storeTurnsInAsyncStorage();
    }
  }, [turns]);

  // Load the stored turns from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTurnsFromAsyncStorage = async () => {
      try {
        const storedTurns = await AsyncStorage.getItem("turns");
        if (storedTurns !== null) {
          setTurns(JSON.parse(storedTurns));
          console.log(
            "Turns loaded from AsyncStorage in Main content:",
            storedTurns
          );
          if (storedTurns === 5) {
            console.log("Setting icon to finish");
            setIcon("finish");
          }
        } else {
          setTurns(0);
        }
      } catch (error) {
        console.error("Error loading turns from AsyncStorage:", error);
      }
    };
    loadTurnsFromAsyncStorage();
  }, []);
  // set below variables to ensure that feedback screen not shown until country button pressed

  useEffect(() => {
    console.log("score in main", score);

    setCountry("");
    setHaveAnswer(false);
    setCountryUnderscore("");

    console.log(
      "useEffect to set Haveanswer and countryUnderscore to false at beginning of MAIN SCREEN: setHaveAnswer and setCountryUnderscore",
      haveAnswer,
      countryUnderscore
    );
  }, []); // Empty dependency array means this runs only once on mount

  let storedTurns;
  useEffect(() => {
    storedTurns = async () => {
      try {
        storedTurns = await getStoredTurns();
        if (
          (turns === 0 && countryUnderscore === "") ||
          arrayDailyFlags === null
        ) {
          setScore(0);
        }
        console.log("score  updated to 0 in main");
      } catch (error) {
        console.error("Error loading turn count: in main", error);
      }
    };
  }, [turns]);

  // Function to fetch or generate new flags based on the date
  const fetchOrGenerateFlags = async () => {
    try {
      const storedFlags = await AsyncStorage.getItem("arrayDailyFlags"); // Retrieve stored flags
      const storedDate = await AsyncStorage.getItem("flagGenerationDate"); // Retrieve the stored generation date

      const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

      if (storedFlags !== null && storedDate === today) {
        // If flags exist and were generated today, use them
        setArrayDailyFlags(JSON.parse(storedFlags));
        // console.log("Flags loaded from storage:", JSON.parse(storedFlags));
      } else {
        // If no flags are stored or it's a new day, generate new flags
        const newFlags = generateNewFlagsToPopulateArrayDailyFlags();
        setArrayDailyFlags(newFlags);

        // Store new flags and the current date
        await AsyncStorage.setItem("arrayDailyFlags", JSON.stringify(newFlags));
        await AsyncStorage.setItem("flagGenerationDate", today);

        console.log("Generated and stored new flags:", newFlags);
      }
    } catch (error) {
      console.error("Error fetching or generating flags:", error);
    }
  };

  useEffect(() => {
    fetchOrGenerateFlags();
    // Fetch or generate flags only once when the component mounts
  }, []);

  useEffect(() => {
    if (turns === 0) {
      let currentFlagNumber = arrayDailyFlags[turns];
      let flagWithoutUnderscore = String(flags[currentFlagNumber]);
      let flagWithUnderscore = flagWithoutUnderscore.replaceAll(" ", "_");
      setCurrentFlag(flagWithUnderscore);
    }
  });

  return (
    <>
  
        {/* <Animated.View style={{ flex: 1, transform: [{ translateY: keyboardHeight }] } } pointerEvents="box-none"> */}

{/* 
        <ScrollView  scrollEnabled={true}
  showsVerticalScrollIndicator={true}
  keyboardShouldPersistTaps={true}
  keyboardDismissMode='on-drag'
   // keyboardDismissMode="interactive"
    > */}
       
        <View style={[s.mainContent, { flex: 1 }]}    >
     
        <Stars
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
        />
      
        <Text style={s.mainContentText}>
          Which Country or Territory Does this Flag Belong to?
        </Text>

        <View>
          {currentFlag && allFlagImages[currentFlag] ? (
            <Image source={allFlagImages[currentFlag]} style={s.flagImage} />
          ) : (
            <Text>Loading...</Text> // Show a loading message if currentFlag is not available
          )}
        </View>
        <View>
          <Text style={s.mainContentText}>
            Type and Select the Name of a Country or Territory
          </Text>
        </View>
    

      
        <View style={s.inputView}>
          <Input
            autoCorrect={false} // Disables predictive text
            autoComplete="off"
            countryButtonVisible={countryButtonVisible}
            setCountryButtonVisible={setCountryButtonVisible}
            inputValue={inputValue}
            setInputValue={setInputValue}
            countryMatchingPredText={countryMatchingPredText}
            setCountryMatchingPredText={setCountryMatchingPredText}
            score={score}
            setScore={setScore}
            icon={icon}
            setIcon={setIcon}
            practiceCountryButtonVisible={practiceCountryButtonVisible}
            setPracticeCountryButtonVisible={setPracticeCountryButtonVisible}
            scrollViewRef={scrollViewRef}
          />
        </View>
      


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
            turns={turns}
            setTurns={setTurns}
            countryUnderscore={countryUnderscore}
            setCountryUnderscore={setCountryUnderscore}
            score={score}
            setScore={setScore}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
            haveAnswer={haveAnswer}
            setHaveAnswer={setHaveAnswer}
            practiceHaveAnswer={practiceHaveAnswer}
            setPracticeHaveAnswer={setPracticeHaveAnswer}
            countryButtonVisible={countryButtonVisible}
            setCountryButtonVisible={setCountryButtonVisible}
            practiceCountryUnderscore={practiceCountryUnderscore}
            setPracticeCountryUnderscore={setPracticeCountryUnderscore}
            practiceCountry={practiceCountry}
            setPracticeCountry={setPracticeCountry}
            scrollViewRef={scrollViewRef}
            keyboardOffset={keyboardOffset}
            //setKeyboardOffset={setKeyboardOffset}
          />
        </View>
  


      </View>
      {/* </ScrollView> */}
      {/* </Animated.View> */}

    </>
  );
}
