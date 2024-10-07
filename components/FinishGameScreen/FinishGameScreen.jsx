import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import {Text, View} from "react-native";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import {flags } from '../../utils/countryTerritoryNames';
import{useEffect} from "react";
import { storeScore } from '../../utils/asyncStorageUtils'; // Adjust the path as per your project structure
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { storeGameCount } from '../../utils/asyncStorageUtils'; // Adjust the path as per your project structure

export function FinishGameScreen({ country, currentFlag, score, setScore, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore,
  gameCount, setGameCount
 }) {
    // Use storeScore inside this component when needed

    useEffect(() => {
      loadAndIncrementGameCount();
  }, []); // Runs once on component load
    
    useEffect(() => {
        if (score !== null && score !== undefined) {
            storeScore(score);
        }
    }, [score]);

    // Function to retrieve and increment the game count
    const loadAndIncrementGameCount = async () => {
      try {
          // Retrieve stored game count
          const storedGameCount = await AsyncStorage.getItem("gameCount");
          const parsedGameCount = storedGameCount ? JSON.parse(storedGameCount) : 0;

          // Increment game count
          const newGameCount = parsedGameCount + 1;

          // Store the new game count back to AsyncStorage
          await AsyncStorage.setItem("gameCount", JSON.stringify(newGameCount));

          // Update state
          setGameCount(newGameCount);
      } catch (error) {
          console.error("Error loading or updating game count:", error);
      }
  };


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