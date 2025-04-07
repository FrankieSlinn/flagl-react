import { s } from "../../App.style.js";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Stars } from "../Stars/Stars.jsx";
import { flags } from "../../utils/countryTerritoryNames.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useScreenContext } from "../../utils/helpLastScreen.js";
import {
  storeTurns,
  getStoredTurns,
  getStoredCountryUnderscore,
} from "../../utils/asyncStorageUtils.js";

export function FeedbackScreen({
  currentFlag,
  setCurrentFlag,
  countryUnderscore,
  setCountryUnderscore,
  icon,
  setIcon,
  turns,
  setTurns,
  arrayDailyFlags,
  correctAnswers,
  setCorrectAnswers,
  haveAnswer,
  score,
  newGame,
  setNewGame,
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  const [translateY, setTranslateY] = useState(0);

  setNewGame(false);

  useEffect(() => {
    setLastScreen("feedback");
  }, []);

  useEffect(() => {
    const fetchCountryunderscore = async () => {
      const countryUnderscore = await getStoredCountryUnderscore();
      console.log("Score in stats", score);
      setCountryUnderscore(countryUnderscore);
    };

    fetchCountryunderscore();
  }, []);

  const setTheCurrentFlag = async (storedTurnCount) => {
    try {
      if (arrayDailyFlags.length > 0) {
        let currentFlagNumber = arrayDailyFlags[storedTurnCount];
        let flagWithoutUnderscore = String(flags[currentFlagNumber]);
        let flagWithUnderscore = flagWithoutUnderscore.replaceAll(" ", "_");

        console.log("Stored Turns updated to:", storedTurnCount);
        console.log("Updating flag to:", flagWithUnderscore);

        setCurrentFlag(flagWithUnderscore); // Set the flag after turns has updated
      }
    } catch (error) {
      console.error("Error fetching or generating flags:", error);
    }
  };

  function handleFinishGame() {
    setIcon("finish");
  }

  function handleFeedbackButtonPress() {
    // Reset icon
    newTurn();
    console.log("resetting icon to main content");
    // console.log("setHaveAnswer", haveAnswer);
  }

  const newTurn = async () => {
    try {
      console.log("newTurn function running");
      const storedTurnCount = await getStoredTurns();
      const incrementedStoredTurnCount = storedTurnCount + 1;

      if (storedTurnCount <= 3) {
  

        storeTurns(JSON.stringify(incrementedStoredTurnCount));

        setTurns(incrementedStoredTurnCount);

        setTheCurrentFlag(incrementedStoredTurnCount);
      }
      if (incrementedStoredTurnCount <= 4) {
        setIcon("");
      } else if (incrementedStoredTurnCount > 4) {
        handleFinishGame();
      }
    } catch (error) {
      console.error("Error loading or updating turn count:", error);
    }
  };

  return (
    <View style={[s.mainContent, { transform: [{ translateY }] }]}>
      <Stars
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
      />

      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${
              flags[arrayDailyFlags[turns]]
            }.`
          : `Unlucky. That Was Not Correct. The Answer Is ${
              flags[arrayDailyFlags[turns]]
            }.`}
        {"\n"}
      </Text>

      {turns <= 3 && (
        <TouchableOpacity style={s.newTurn} onPress={handleFeedbackButtonPress}>
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
