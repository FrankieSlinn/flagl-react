import { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { s } from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import { getStoredScore } from '../../utils/asyncStorageUtils';
import { getStoredGameCount} from '../../utils/asyncStorageUtils';





export function Stats({ icon, setIcon, correctAnswers, setCorrectAnswers, turns, setTurns, score , gameCount, setGameCount}) {
    const [storedScore, setStoredScore] = useState(null);
    const [storedGameCount, setStoredGameCount] = useState(null);

    // Fetch the stored score when the component mounts
    useEffect(() => {
        const fetchScore = async () => {
            const score = await getStoredScore();
            setStoredScore(score);  // Set the score in state
        };

        fetchScore();

        const fetchGameCount = async () => {
            const gameCount = await getStoredGameCount();
            setStoredGameCount(gameCount);  // Set the game count in state
        };

        fetchGameCount();
    }, []);
    return (<>
    <View style={s.closeButtonContainer}>
<CloseButton onPress={() => setIcon("")} />
</View>
  <Text style={s.iconHeader}>FLAGL Statistics</Text>
 
  <Text> {storedScore !== null ? `Today's FLAGL Game Score is: ${storedScore}%` : "No score stored yet."}</Text>
  <Text> {storedGameCount!== null ? `You have played ${storedGameCount} game/s so far.` : "No games played yet."}</Text>





 
  

    </>
  );
}