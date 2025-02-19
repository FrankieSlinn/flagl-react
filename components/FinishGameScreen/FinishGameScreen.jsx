import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
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
  resultsArray,
  scoreArrayUpdated,
  setScoreArrayUpdated
}) {
  const { lastScreen, setLastScreen } = useScreenContext();
  
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  console.log("resultsArray in Finish game", resultsArray)
  console.log("is rsultsArray in Finish game", Array.isArray(resultsArray)) 

  useEffect(() => {
    setLastScreen("finish");
  }, []);


  // Calculate time left until 12 am UK time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnightUK = new Date();
      midnightUK.setUTCHours(0, 0, 0, 0); // Set time to 12 am UTC
      if (now > midnightUK) {
        midnightUK.setUTCDate(midnightUK.getUTCDate() + 1); // Move to next day
      }
      const timeDifference = midnightUK - now;
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });

      if(timeLeft==={ hours: 0, minutes: 0, seconds: 0 }){
        setIcon("")

      }
    };

    calculateTimeLeft(); // Initial calculation
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
    const loadAndIncrementScoreArray = async () => {
      try {
        if (icon === "finish" && scoreArrayUpdated===false) {
          const storedScoreArray = await getAllStoredScores();
      

          // Add the new score
          const incrementedScoreArray = 
          Array.isArray(storedScoreArray)
            ? storedScoreArray.concat([score])
            : [score];
          setScoreArrayUpdated(true)
         
        

          // Store the new score array in AsyncStorage
          await AsyncStorage.setItem(
            "scoreArray",
            //JSON.stringify(incrementedScoreArray)
            JSON.stringify(incrementedScoreArray),
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
  }, [score]); // Removed extra brace, added "icon" to dependencies

  function practiceButtonPress() {
    console.log("practiceButtonPress funtion running")
    setCountryUnderscore("");
    setCountry("");
    setIcon("practice");
    console.log("icon for practice in finish game screen after set", icon)
    
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
  

  return (
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
      <TouchableOpacity style={s.shareScoreButton} onPress={() => handleCopy(resultsArray)}>
        <Text style={s.shareScoreButtonText}>Share FLAGL Score</Text>
      </TouchableOpacity>
      </View>
      <View style={s.timerContainer}>
      <Text style={s.mainContentText}>
  FLAGL Will Reset In {""}
  <Text style={{ fontWeight: 'bold' }}>{ timeLeft.hours}</Text> Hours {""}
  <Text style={{ fontWeight: 'bold' }}>{timeLeft.minutes}</Text> Minutes {""}
  <Text style={{ fontWeight: 'bold' }}>{timeLeft.seconds}</Text> Seconds
</Text>
      </View>
  <View style={s.practiceButtonContainer}>
      <Text style={s.practiceText}>To Improve Your Game Go To</Text>
      <TouchableOpacity onPress={practiceButtonPress} style={s.practiceButton} >
        <Text style={s.shareScoreButtonText}>Practice FLAGL</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
