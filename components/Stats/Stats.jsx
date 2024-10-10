import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { s } from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import { storeGameCount, getStoredGameCount, storeScore, getStoredScore} from '../../utils/asyncStorageUtils';






export function Stats({ icon, setIcon, correctAnswers, setCorrectAnswers, turns, setTurns, score , setScore, gameCount, setGameCount, storedGameCount, 
  setStoredGameCount
}) {
    const [storedScore, setStoredScore] = useState(null);


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
    }, []);
    return (<>
    <View style={s.closeButtonContainer}>
<CloseButton onPress={() => setIcon("")} />
</View>
  <Text style={s.iconHeader}>FLAGL Statistics</Text>
 
  <Text> {score !== null ? `Today's FLAGL Game Score is: ${score}%` : "No score stored yet."}</Text>
  <Text> {gameCount!== null ? `You have played ${gameCount} game/s so far.` : "No games played yet."}</Text>





 
  

    </>
  );
}