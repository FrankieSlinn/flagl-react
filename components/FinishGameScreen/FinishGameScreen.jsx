import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import {Text, View} from "react-native";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import {flags } from '../../utils/countryTerritoryNames';
import{useEffect} from "react";
import { storeScore } from '../../utils/asyncStorageUtils'; // Adjust the path as per your project structure
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getStoredGameCount, storeGameCount} from '../../utils/asyncStorageUtils';

export function FinishGameScreen({ country, currentFlag, score, setScore, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore,
  gameCount, setGameCount, arrayDailyFlags, storedGameCount, setStoredGameCount, turns, setTurns, icon
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
            const storedGameCount1 = await getStoredGameCount();
            console.log("getStoredGameCount1 in Finish Game", storedGameCount1);
    
            // Store the new game count back to AsyncStorage
            await AsyncStorage.setItem("gameCount", JSON.stringify(incrementedGameCount));
          }
        } catch (error) {
          console.error("Error loading or updating game count:", error);
        }
      };
    
      loadAndIncrementGameCount();
    }, [icon]);  // Removed extra brace, added "icon" to dependencies
    


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
</Text>

</View>

    )


    
}