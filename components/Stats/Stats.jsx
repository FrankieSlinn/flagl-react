
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { s } from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import {
  getStoredScore,
  getAllStoredScores,
  storeAllScores
} from "../../utils/asyncStorageUtils";
import { useScreenContext } from "../../utils/helpLastScreen";
import { daysElapsed } from "../../utils/daysElapsed";
import { copyResultsToClipboard } from "../../utils/copyResultsToClipboard";

export function Stats({
  setIcon,
  turns,
  score,
  gameCount,
  setGameCount,
  scoreArray,
  setScoreArray,
  resultsArray,
}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  const [averageScore, setAverageScore] = useState(0);

  console.log("resultsArray in Stats", resultsArray);


  // Fetch the stored score when the component mounts
  useEffect(() => {
    const fetchAndSetScores = async () => {
      try {
        const fetchedScoreArray = await getAllStoredScores();
        console.log("Fetched scoreArray in Stats:", fetchedScoreArray);
  
       // setScoreArray(fetchedScoreArray); // Update state with fetched scores
        setGameCount(fetchedScoreArray.length);
  
        const totalScore = fetchedScoreArray.reduce((acc, val) => acc + val, 0);
        const average = fetchedScoreArray.length > 0
          ? (totalScore / fetchedScoreArray.length).toFixed(0)
          : 0;
  
        setAverageScore(average);
      } catch (error) {
        console.error("Error fetching and setting scoreArray in Stats:", error);
      }
    };
  
    fetchAndSetScores();
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
      <View style={s.statsContainer}>
        <Text style={s.iconHeader}>
          FLAGL Statistics
          {"\n"}
        </Text>

        <View style={s.statsBody}>
          <Text style={s.statsText}>
            {turns === 4 ? (
              <>
                Today's FLAGL Game Score Is:{" "}
                <Text style={{ fontWeight: "bold" }}>{score}%</Text>
              </>
            ) : (
              "Play A Game To Get Today's Score"
            )}
            {"\n"}
          </Text>
          <Text style={s.statsText}>
            {gameCount !== 0? (
              <>
                You Have Played{" "}
                <Text style={{ fontWeight: "bold" }}>{gameCount}</Text> Game/s
              </>
            ) : (
              "No Games Played Yet"
            )}
            {"\n"}
          </Text>
          <Text style={s.statsText}>
            {" "}
            {gameCount !== 0 ? (
              <>
                Your Average Score Is:{" "}
                
                <Text style={{ fontWeight: "bold" }}>{averageScore}%</Text>
              </>
            ) : (
              "Average Score: TBC"
            )}
     
          </Text>
         
        </View>
      </View>
      <View style={s.shareScoreButtonContainer}>
        {turns >= 4 ? (
          <TouchableOpacity style={s.shareScoreButton} onPress={handleCopy}>
            <Text style={s.shareScoreButtonText}>Share FLAGL Score</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}
