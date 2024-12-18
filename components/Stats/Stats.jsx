
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import { s } from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import {
  getStoredScore,
  getAllStoredScores,
} from "../../utils/asyncStorageUtils";
import { useScreenContext } from "../../utils/helpLastScreen";
import {daysElapsed} from "../../utils/daysElapsed";
import {copyResultsToClipboard} from "../../utils/copyResultsToClipboard";


export function Stats({
  setIcon,
  turns,
  score,
  gameCount,
  setGameCount,
  scoreArray,
  setScoreArray,
  resultsArray
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  const [averageScore, setAverageScore] = useState(0);

  console.log("resultsArray in Stats", resultsArray)
  console.log("is rsultsArray in Stats", Array.isArray(resultsArray)) 

  console.log("days elapsed", daysElapsed)
 

  // Fetch the stored score when the component mounts
  useEffect(() => {
    const fetchScore = async () => {
      const score = await getStoredScore();
      console.log("Score in stats", score); // setScore(score); // Set the score in state
    };

    fetchScore();

    const fetchScoreArray = async () => {
      const scoreArrayInStats = await getAllStoredScores();
      console.log("await getg allstoredscores in stats", scoreArrayInStats);
      setGameCount(scoreArrayInStats.length);
      console.log(
        "gameCount from allstoredscores array in stats",
        scoreArrayInStats.length
      );
      const totalScore = scoreArrayInStats.reduce(
        (acc, score) => acc + score,
        0
      );
      console.log("Total score", totalScore);

      const average = (totalScore / scoreArrayInStats.length).toFixed(2);
      setAverageScore(average);
      console.log("averageScore: ", averageScore);
      console.log("get score Array in Stats", scoreArrayInStats);

      setScoreArray(scoreArrayInStats);
      console.log("scorearray that was set in stats", scoreArray);
    };

    fetchScoreArray();
  }, []);

  function handleCloseButtonPress() {
    if (lastScreen != null) {
      setIcon(lastScreen);
    }
    setLastScreen("popup");
    console.log("last screen in stats", lastScreen);
  }

  const handleCopy = async () => {
    try {
      await copyResultsToClipboard(resultsArray, daysElapsed); // Pass `resultsArray` as an argument
    } catch (error) {
      console.error("Failed to copy results to clipboard:", error);
    }
  };



  return (
    <>
      <View style={s.closeButtonContainer}>
        <CloseButton
          onPress={() => {
            handleCloseButtonPress();
          }}
        />
      </View>
      <Text style={s.iconHeader}>FLAGL Statistics</Text>

      <Text>
        {" "}
        {turns === 4
          ? `Today's FLAGL Game Score Is: ${score}%`
          : "Finsh A Game To Get Today's FLAGL Score"}
      </Text>
      <Text>
        {" "}
        {gameCount !== null
          ? `You Have Played ${gameCount} Game/s So Far`
          : "No Games Played Yet"}
      </Text>
      <Text>
        {" "}
        {scoreArray !== null
          ? `Your Average Score Is: ${averageScore}`
          : "Start Playing Games To Get An Average Score"}
      </Text>
      {"\n"}
      {"\n"}
      {"\n"}
      <View style={s.shareScoreButtonContainer}>
        <TouchableOpacity style={s.shareScoreButton} onPress={handleCopy}>
          <Text style={s.shareScoreButtonText}>Share FLAGL Score</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
