import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import {Text, View, TouchableOpacity} from "react-native";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import {flags } from '../../utils/countryTerritoryNames';
import{useEffect} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getStoredGameCount, storeAllScores, storeScore, getAllStoredScores, storeGameCount} from '../../utils/asyncStorageUtils';

export function FinishGameScreen({ country, currentFlag, score, setScore, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore,
  gameCount, setGameCount, arrayDailyFlags,  turns, setTurns, icon
 }) {
  //   // Use storeScore inside this component when needed

  //   useEffect(() => {
  //     loadAndIncrementGameCount();
  // }, []); // Runs once on component load
    
    useEffect(() => {
        if (score !== null && score !== undefined) {
            storeScore(score);
        }
    }, [score]);

    useEffect(() => {
      const loadAndIncrementGameCount = async () => {
        try {
          // Retrieve stored game count
          if (icon === "finish") {
            const storedGameCount = await getStoredGameCount();
            const incrementedGameCount = storedGameCount + 1;
            console.log("getStoredGameCount in Finish Game", incrementedGameCount);
    
    
            // Store the new game count back to AsyncStorage
            await AsyncStorage.setItem("gameCount", JSON.stringify(incrementedGameCount));
          }
        } catch (error) {
          console.error("Error loading or updating game count:", error);
        }
      };
    
      loadAndIncrementGameCount();
    }, [icon]);  
    useEffect(() => {
      const loadAndIncrementScoreArray = async () => {
        try {
          if (icon === "finish") {
            const storedScoreArray = await getAllStoredScores();
            console.log("Existing score array before adding new score:", storedScoreArray);
            
            // Add the new score
            const incrementedScoreArray = storedScoreArray ? storedScoreArray.concat(score) : [score];
            console.log("Updated score array in Finish Game with new score:", incrementedScoreArray);
            
            // Store the new score array in AsyncStorage
            await AsyncStorage.setItem("scoreArray", JSON.stringify(incrementedScoreArray));

        // Check if it was stored correctly
        const checkStored = await getAllStoredScores();
        setTimeout(() => {
          console.log("scoreArray in Finish Game state after setting  after half a second:", checkStored);
        }, 500); 
          }
        } catch (error) {
          console.error("Error loading or updating score array:", error);
        }
      };
    
      loadAndIncrementScoreArray();
    }, [icon]); // Removed extra brace, added "icon" to dependencies
    


    return(

<View>
<Stars correctAnswers = {correctAnswers}
setCorrectAnswers={setCorrectAnswers}
/>
      <Text style={s.mainContentText}>
      {countryUnderscore === currentFlag
    ? `Congratulations. You Are Right. The Answer Is ${country}.`
    : `Unlucky. That Was Not Correct. The Answer Is ${flags[arrayDailyFlags[turns]]}.`}
  {'\n'}
</Text>
<Text style = {s.scoreText}>
    {`Your FLAGL Score is ${score}%`}
    {'\n'}
</Text>
<TouchableOpacity>
  <Text>FLAGL Practice Mode</Text>
</TouchableOpacity>


</View>

    )


    
}