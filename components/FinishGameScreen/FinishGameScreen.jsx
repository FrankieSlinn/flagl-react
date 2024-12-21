import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useScreenContext } from "../../utils/helpLastScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  storeScore,
  getAllStoredScores,
  getStoredCountryUnderscore,
} from "../../utils/asyncStorageUtils";
import {daysElapsed} from "../../utils/daysElapsed";
import {copyResultsToClipboard} from "../../utils/copyResultsToClipboard";

export function FinishGameScreen({
  setCountry,
  currentFlag,
  score,
  correctAnswers,
  setCorrectAnswers,
  countryUnderscore,
  setCountryUnderscore,
  icon,
  setIcon,
  resultsArray
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  console.log("resultsArray in Finish game", resultsArray)
  console.log("is rsultsArray in Finish game", Array.isArray(resultsArray)) 

  useEffect(() => {
    setLastScreen("finish");
  }, []);

  useEffect(() => {
    const fetchCountryunderscore = async () => {
      const countryUnderscore = await getStoredCountryUnderscore();
      console.log("Score in stats", score);
      setCountryUnderscore(countryUnderscore); // Set the countryUnderscore in state
      setCountry(countryUnderscore.replace("_", " ")); // Set the countryUnderscore in
    };

    fetchCountryunderscore();
  }, []);

  useEffect(() => {
    if (score !== null && score !== undefined) {
      storeScore(score);
    }
  }, [score]);

  useEffect(() => {
    const loadAndIncrementScoreArray = async () => {
      try {
        if (icon === "finish") {
          const storedScoreArray = await getAllStoredScores();
          console.log(
            "Existing score array before adding new score:",
            storedScoreArray
          );

          // Add the new score
          const incrementedScoreArray = Array.isArray(storedScoreArray)
            ? storedScoreArray.concat([score])
            : [score];
          console.log("[score]", [score]);
          console.log(
            "Updated score array in Finish Game with new score:",
            incrementedScoreArray
          );

          // Store the new score array in AsyncStorage
          await AsyncStorage.setItem(
            "scoreArray",
            JSON.stringify(incrementedScoreArray)
          );

          // Check if it was stored correctly
          const checkStored = await getAllStoredScores();
          setTimeout(() => {
            console.log(
              "scoreArray in Finish Game state after setting  after half a second:",
              checkStored
            );
          }, 500);
        }
      } catch (error) {
        console.error("Error loading or updating score array:", error);
      }
    };
    if (icon === "finish") {
      loadAndIncrementScoreArray();
      console.log("resultArray in finish", resultsArray)
      console.log("is rsultsArray in finish game array?", Array.isArray(resultsArray)) 
    }
  }, []); // Removed extra brace, added "icon" to dependencies

  function practiceButtonPress() {
    setCountryUnderscore("");
    setCountry("");
    setIcon("practice");
    
  }

  const handleCopy = async (arrayToCopy) => {
    try {
      console.log("Array.isArray(arrayToCopy)", Array.isArray(arrayToCopy));
      console.log("arrayToCopy:", arrayToCopy);
      await copyResultsToClipboard(arrayToCopy, daysElapsed);
    } catch (error) {
      console.error("Failed to copy results to clipboard:", error);
    }
  };

  handleCopy(resultsArray);

  return (
    <View>
      <Stars
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
      />
      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${currentFlag.replace(
              "_",
              " "
            )}.`
          : `Unlucky. That Was Not Correct. The Answer Is ${currentFlag.replace(
              "_",
              " "
            )}.`}
        {"\n"}
      </Text>
      <Text style={s.scoreText}>
        {`Your FLAGL Score is ${score}%`}
        {"\n"}
      </Text>
      <View style={s.shareScoreButtonContainer}>
      <TouchableOpacity style={s.shareScoreButton} onPress={copyResultsToClipboard}>
        <Text style={s.shareScoreButtonText}>Share FLAGL Score</Text>
      </TouchableOpacity>
      </View>
  
      <Text>To Get Better At Guessing Flags Visit</Text>
      <TouchableOpacity onPress={handleCopy}>
        <Text>FLAGL Practice Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
