import { s } from "../../App.style.js";
import { Text, Image, View } from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import {
  getStoredTurns,
  storeTurns,
  storeScore,
  getStoredArrayDailyFlags,
} from "../../utils/asyncStorageUtils";
import { Stars } from "../Stars/Stars";
import { Input } from "../Input/Input";
import { CountryButton } from "../CountryButton/CountryButton";
import { fetchOrGenerateFlags } from "../../utils/generateFlags.js";
import * as allFlagImages from "../../utils/flagMappings";
import { flags } from "../../utils/countryTerritoryNames";
import { useScreenContext } from "../../utils/helpLastScreen";

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
  arrayFlagNames,
  setArrayFlagNames,
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
  keyboardOffset,
  resultsArray,
  setResultsArray,
  validateCorrect,
  setValidateCorrect,
  scoreArrayUpdated,
  setScoreArrayUpdated,
  newGame,
  setNewGame,
  sessionStart,
  setSessionStart,
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  //Listener to update more quickly, resets flag parameters
  useEffect(() => {
    console.log(
      "function to update flag parameters to display flag in main running!!!!!"
    );
    if (newGame === false) {
      const setFlagParametersForDisplay = async () => {
        try {
          const updatedFlagArray = await getStoredArrayDailyFlags();
          const storedTurnCount = await getStoredTurns();
          if (storedTurnCount === 0) {
            let currentFlagNumber = updatedFlagArray[storedTurnCount];
            let flagWithoutUnderscore = String(flags[currentFlagNumber]);
            let flagWithUnderscore = flagWithoutUnderscore.replaceAll(" ", "_");
            // Update state for currentFlag - needed for image
            setCurrentFlag(flagWithUnderscore);
          }
        } catch (error) {
          console.error("Error getting arrayDailyFlags:", error);
        }
      };
      setFlagParametersForDisplay();
    }
  }, [arrayFlagNames]);

  useEffect(() => {
    setLastScreen("");

    console.log("last screen main");
  }, []);

  // Store the updated turns in AsyncStorage whenever it changes
  useEffect(() => {
    const handleTurns = async () => {
      if (newGame) {
        await storeTurns(0);
        const storedTurns = await getStoredTurns(); // Wait for the stored value
        console.log(
          "new game in maincontent",
          newGame,
          "getStoredTurns()",
          storedTurns,
          "turns",
          turns
        );
        setTurns(0);
      }

      if (turns !== null) {
        await storeTurns(turns);
      }
    };
    handleTurns();
  }, [turns, newGame]); //
  //reset score in beginning
  useEffect(() => {
    const handleScoresResultsIfNoTurns = async () => {
      try {
        const storedTurnCount = await getStoredTurns();
        if (storedTurnCount === 0) {
          setScore(0);
          storeScore(0);

          setResultsArray([]);
        }
      } catch (error) {
        console.error("Error setting scores, results in 0 turns", error);
        handleScoresResultsIfNoTurns();
      }
    };
  }, []);

  // Load the stored turns from AsyncStorage when the component mounts. Reset Turns when needed.
  useEffect(() => {
    const switchToFinishScreen = async () => {
      try {
        const storedTurnCount = await getStoredTurns();

        if (storedTurnCount !== null) {
          setTurns(storedTurnCount); // Removed ()

          if (storedTurnCount === 5) {
            setIcon("finish");
          }
        } else {
          await storeTurns(0); // Corrected function call with argument
        }
      } catch (error) {
        console.error("Error loading or storing turns:", error);
      }
    };

    switchToFinishScreen(); // Call the async function inside useEffect
  }, []);

  // set below variables to ensure that feedback screen not shown until country button pressed
  //reset items

  useEffect(() => {
    setCountry("");
    setHaveAnswer(false);
    setCountryUnderscore("");
  }, []); // Empty dependency array means this runs only once on mount

  useEffect(() => {
    console.log(
      "!??????!!!!Running fetch Or Geenerate Flags From Main!!!! session start in main",
      sessionStart
    );
    if (sessionStart === true) {
      setSessionStart(false);
      console.log("fetchOrGenerateFlags initiated from MainContent");
      fetchOrGenerateFlags(
        true,
        setNewGame,
        setArrayDailyFlags,
        arrayFlagNames,
        setArrayFlagNames
      );
    }

    // Fetch or generate flags only once when the component mounts
  }, []);

  return (
    <>
      <View style={[s.mainContent, { flex: 1 }]}>
        <Stars
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
        />

        <Text style={s.mainContentText}>
          Which Country or Territory Does this Flag Belong to?
        </Text>

        <View style={s.flagImageContainer}>
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
            keyboardOffset={keyboardOffset}
            resultsArray={resultsArray}
            setResultsArray={setResultsArray}
            validateCorrect={validateCorrect}
            setValidateCorrect={setValidateCorrect}
            scoreArrayUpdated={scoreArrayUpdated}
            setScoreArrayUpdated={setScoreArrayUpdated}
            inputValue={inputValue}
          />
        </View>
      </View>
    </>
  );
}
