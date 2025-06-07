import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useScreenContext } from "../../utils/helpLastScreen";
import { fetchOrGenerateFlags } from "../../utils/generateFlags.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAllStoredScores,
  getStoredCountryUnderscore,
  storeTurns,
} from "../../utils/asyncStorageUtils";
import { daysElapsed } from "../../utils/daysElapsed";
import { flags } from "../../utils/countryTerritoryNames";
import { copyResultsToClipboard } from "../../utils/copyResultsToClipboard";

export function FinishGameScreen({
  setCountry,
  currentFlag,
  setCurrentFlag,
  score,
  setScore,
  correctAnswers,
  setCorrectAnswers,
  countryUnderscore,
  setCountryUnderscore,
  icon,
  setIcon,
  resultsArray,
  setResultsArray,
  scoreArrayUpdated,
  setScoreArrayUpdated,
  arrayDailyFlags,
  setArrayDailyFlags,
  arrayFlagNames,
  setArrayFlagNames,
  newGame,
  setNewGame,
  turns,
  setTurns,
  setSessionStart,
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setLastScreen("finish");
  }, []);

  useEffect(() => {
    setSessionStart(false);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const ukMidnight = new Date();
      ukMidnight.setHours(24, 0, 0, 0);

      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0 &&
        newGame === false
      ) {
        ukMidnight.setDate(ukMidnight.getDate() + 1);
        console.log("!!! Game resetting at midnight");
        resetGame();
      }

      const timeDifference = ukMidnight - now;
      setTimeLeft({
        hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
        seconds: Math.floor((timeDifference / 1000) % 60),
      });
    };

    const resetGame = async () => {
      try {
        await AsyncStorage.setItem("arrayDailyFlags", JSON.stringify([]));
        if (newGame === false) {
          setArrayDailyFlags([]);
          setArrayFlagNames([]);
          setNewGame(true);
          setScore(0);
          setTurns(0);
          storeTurns(0);
          setResultsArray([]);
          setCorrectAnswers(0);
          setIcon("");
          fetchOrGenerateFlags(
           true,
            setNewGame,
            setArrayDailyFlags,
            arrayFlagNames,
            setArrayFlagNames
          );
          console.log("Game has been reset.");
        }
      } catch (error) {
        console.error("resetGame failed", error);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (turns === 0 && arrayDailyFlags.length > 0) {
      const currentFlagNumber = arrayDailyFlags[0];
      if (typeof currentFlagNumber === "number") {
        const flagWithoutUnderscore = String(flags[currentFlagNumber]);
        setCurrentFlag(flagWithoutUnderscore.replaceAll(" ", "_"));
      }
    }  });


  

  useEffect(() => {
    const fetchCountryunderscore = async () => {
      const countryUnderscore = await getStoredCountryUnderscore();
      setCountryUnderscore(countryUnderscore);
      setCountry(countryUnderscore.replace("_", " "));
    };

    fetchCountryunderscore();
  }, []);

  useEffect(() => {
    const loadAndIncrementScoreArray = async () => {
      try {
        if (icon === "finish" && scoreArrayUpdated === false) {
          const storedScoreArray = await getAllStoredScores();
          const incrementedScoreArray = Array.isArray(storedScoreArray)
            ? storedScoreArray.concat([score])
            : [score];
          setScoreArrayUpdated(true);
          await AsyncStorage.setItem(
            "scoreArray",
            JSON.stringify(incrementedScoreArray)
          );
        }
      } catch (error) {
        console.error("Error loading or updating score array:", error);
      }
    };
    if (icon === "finish") {
      loadAndIncrementScoreArray();
    }
  }, [score]);

  function practiceButtonPress() {
    setCountryUnderscore("");
    setCountry("");
    setIcon("practice");
  }

  const handleCopy = async (arrayToCopy) => {
    try {
      // console.log("arrayToCopy:", arrayToCopy);
      await copyResultsToClipboard(arrayToCopy, daysElapsed);
    } catch (error) {
      console.error("Failed to copy results to clipboard:", error);
    }
  };

  return (
    <>
      <View>
        <Stars
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
        />
        <Text style={s.mainContentText}>
          {countryUnderscore === currentFlag
            ? `Congratulations. You Are Right. The Answer Is ${currentFlag.replaceAll(
                "_",
                " "
              )}.`
            : `Unlucky. That Was Not Correct. The Answer Is ${currentFlag.replaceAll(
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
          <TouchableOpacity
            style={s.shareScoreButton}
            onPress={() => handleCopy(resultsArray)}
          >
            <Text style={s.shareScoreButtonText}>Share FLAGL Score</Text>
          </TouchableOpacity>
        </View>
        <View style={s.timerContainer}>
          <Text style={s.mainContentText}>
            FLAGL Will Reset In {""}
            <Text style={{ fontWeight: "bold" }}>
              {timeLeft.hours}
            </Text> Hours {""}
            <Text style={{ fontWeight: "bold" }}>{timeLeft.minutes}</Text>{" "}
            Minutes {""}
            <Text style={{ fontWeight: "bold" }}>{timeLeft.seconds}</Text>{" "}
            Seconds
          </Text>
        </View>
        <View style={s.practiceButtonContainer}>
          <Text style={s.practiceText}>To Improve Your Game Go To</Text>
          <TouchableOpacity
            onPress={practiceButtonPress}
            style={s.practiceButton}
          >
            <Text style={s.shareScoreButtonText}>Practice FLAGL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
