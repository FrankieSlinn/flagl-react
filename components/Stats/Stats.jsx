import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { s } from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import {  storeScore, getStoredScore, getAllStoredScores} from '../../utils/asyncStorageUtils';
import  { useScreenContext } from '../../utils/helpLastScreen';






export function Stats({ icon, setIcon, correctAnswers, setCorrectAnswers, turns, setTurns, score , setScore, gameCount, setGameCount,
  scoreArray, setScoreArray
}) {
  const { lastScreen, setLastScreen } = useScreenContext();



  const[averageScore, setAverageScore] = useState(0);



    // Fetch the stored score when the component mounts
    useEffect(() => {
        const fetchScore = async () => {
            const score = await getStoredScore();
            console.log("Score in stats", score)
         / setScore(score);  // Set the score in state
        };

        fetchScore();


   

        const fetchScoreArray= async () => {
          const scoreArrayInStats = await getAllStoredScores();
          console.log("await getg allstoredscores in stats", scoreArrayInStats)
          setGameCount(scoreArrayInStats.length)
          console.log("gameCount from allstoredscores array in stats", scoreArrayInStats.length)
          const totalScore = scoreArrayInStats.reduce((acc, score) => acc + score, 0);
          console.log("Total score", totalScore)

          const average = (totalScore / scoreArrayInStats.length).toFixed(2);
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
<CloseButton onPress={() => {lastScreen!=null?setIcon(lastScreen):null} }/>
</View>
  <Text style={s.iconHeader}>FLAGL Statistics</Text>
 
  <Text> {score !== null ? `Today's FLAGL Game Score Is: ${score}%` : "Start Playing To Get A Score"}</Text>
  <Text> {gameCount!== null ? `You Have Played ${gameCount} Game/s So Far` : "No Games Played Yet"}</Text>
  <Text> {scoreArray!== null ? `Your Average Score Is: ${averageScore}` : "Start Playing Games To Get An Average Score"}</Text>





 
  

    </>
  );
}