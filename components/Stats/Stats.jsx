import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { s } from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import { storeGameCount, getStoredGameCount, storeScore, getStoredScore, getAllStoredScores} from '../../utils/asyncStorageUtils';






export function Stats({ icon, setIcon, correctAnswers, setCorrectAnswers, turns, setTurns, score , setScore, gameCount, setGameCount,
  scoreArray, setScoreArray
}) {
  const[averageScore, setAverageScore] = useState(0);



    // Fetch the stored score when the component mounts
    useEffect(() => {
        const fetchScore = async () => {
            const score = await getStoredScore();
            console.log("Score in stats", score)
            setScore(score);  // Set the score in state
        };

        fetchScore();

        const fetchGameCount = async () => {
            const gameCountInStats = await getStoredGameCount();
            console.log("get game Count in Stats", gameCountInStats)
            console.log("getStoredGameCount in Stats", getStoredGameCount())
            setGameCount(gameCountInStats);
            
   
            //setStoredGameCount(gameCount);  // Set the game count in state
        };

        fetchGameCount();

        const fetchScoreArray= async () => {
          const scoreArrayInStats = await getAllStoredScores();
          const totalScore = scoreArrayInStats.reduce((acc, score) => acc + score, 0);
          console.log("Total score", totalScore)

          const average = totalScore/scoreArrayInStats.length; 
          setAverageScore(average)
          console.log("averageScore: ", averageScore)
          console.log("get score Array in Stats", scoreArrayInStats)
         // console.log("getStoredScoreArray in Stats", getStoredGameCount())
          setScoreArray(scoreArrayInStats);
          console.log("scorearray that was set in stats", scoreArray)
          
          
 
          //setStoredGameCount(gameCount);  // Set the game count in state
      };

 

      fetchScoreArray();
    }, []);
    return (<>
    <View style={s.closeButtonContainer}>
<CloseButton onPress={() => {turns===4?setIcon("finish"):setIcon("")}}/>
</View>
  <Text style={s.iconHeader}>FLAGL Statistics</Text>
 
  <Text> {score !== null ? `Today's FLAGL Game Score Is: ${score}%` : "Start Playing To Get A Score"}</Text>
  <Text> {gameCount!== null ? `You Have Played ${gameCount} Game/s So Far` : "No Games Played Yet"}</Text>
  <Text> {scoreArray!== null ? `Your Average Score Is: ${averageScore}` : "Start Playing Games To Get An Average Score"}</Text>





 
  

    </>
  );
}