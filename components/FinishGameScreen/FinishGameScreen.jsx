import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import { Text, View, TouchableOpacity } from "react-native";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import { flags } from "../../utils/countryTerritoryNames";
import { useEffect } from "react";
import { useScreenContext } from "../../utils/helpLastScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getStoredGameCount,
  storeAllScores,
  storeScore,
  getAllStoredScores,
  storeGameCount,
  getStoredCountryUnderscore,
} from "../../utils/asyncStorageUtils";

export function FinishGameScreen({
  country,
  setCountry,
  currentFlag,
  setCurrentFlag,
  score,
  setScore,
  correctAnswers,
  setCorrectAnswers,
  countryUnderscore,
  setCountryUnderscore,
  gameCount,
  setGameCount,
  arrayDailyFlags,
  turns,
  setTurns,
  icon,
  setIcon,
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

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
    }
  }, []); // Removed extra brace, added "icon" to dependencies

  function practiceButtonPress() {
    setCountryUnderscore("");
    setCountry("");
    setIcon("practice");
    console.log("Set to practice from finish", icon);
  }

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
      <TouchableOpacity onPress={practiceButtonPress}>
        <Text>FLAGL Practice Mode</Text>
      </TouchableOpacity>
    </View>
  );
}
